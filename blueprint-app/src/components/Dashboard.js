import {
  Avatar,
  Card,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  GridList,
  GridListTile,
  InputBase,
} from "@material-ui/core";
import { Search, Star, StarOutline, StarHalf } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import { connect } from "react-redux";
import { isMobileOnly } from "react-device-detect";
import { logoutUser } from "../actions";

//CSS styling
const styles = () => ({
  "@global": {
    //makes scrollbar look less intrusive
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  searchBar: {
    backgroundColor: "cyan",
    opacity: 0.5,
    borderRadius: 25,
    padding: "10px",
  },
  courseCard: {
    backgroundColor: "orange",
    borderRadius: 25,
    padding: "20px",
  },
  gridList: {
    width: "90vw",
    height: "75vh",
    padding: "15px",
  },
});

class Dashboard extends Component {
  // logsout user
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  // opens account menu (currently only option in menu is to Logout)
  handleOpenMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  // closes account menu
  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  state = {
    anchorEl: null, // anchor for menu, closed by default
    // TODO: remove this list, store/receive data from Firebase instead
    courseList: [
      {
        name: "Probability and Random Processes",
        code: "14:332:226",
        avgRating: 3,
        numOfReviews: 191,
      },
      {
        name: "Multivariable Calculus",
        code: "14:332:228",
        avgRating: 3.2,
        numOfReviews: 211,
      },
      {
        name: "Introduction to Linear Algebra",
        code: "14:332:224",
        avgRating: 4.3,
        numOfReviews: 251,
      },
      {
        name: "Intro to Computers for Engineers",
        code: "14:332:225",
        avgRating: 2.5,
        numOfReviews: 191,
      },
      {
        name: "Class 5",
        code: "14:332:227",
        avgRating: 5,
        numOfReviews: 141,
      },
      {
        name: "Class 6",
        code: "14:140:226",
        avgRating: 3.5,
        numOfReviews: 291,
      },
      {
        name: "Class 7",
        code: "14:140:227",
        avgRating: 3,
        numOfReviews: 345,
      },
      {
        name: "Class 8",
        code: "14:140:180",
        avgRating: 3.5,
        numOfReviews: 424,
      },
      {
        name: "Class 9",
        code: "14:332:300",
        avgRating: 2.5,
        numOfReviews: 227,
      },
      {
        name: "Class 10",
        code: "14:332:302",
        avgRating: 3,
        numOfReviews: 191,
      },
      {
        name: "Class 11",
        code: "14:332:304",
        avgRating: 3.5,
        numOfReviews: 211,
      },
      {
        name: "Class 12",
        code: "14:332:308",
        avgRating: 4.5,
        numOfReviews: 251,
      },
    ],
  };

  render() {
    const { classes, isLoggingOut, logoutError } = this.props;
    return (
      <div>
        <header>
          <IconButton onClick={this.handleOpenMenu} aria-controls="menu">
            <Avatar />
          </IconButton>
          <Menu
            id="menu"
            onClose={this.handleCloseMenu}
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
          >
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </Menu>
        </header>

        <Grid container direction="column" alignItems="center" justify="center">
          <h1>Classes</h1>
          <div className={classes.searchBar}>
            <InputBase
              placeholder="Course Name or Code..."
              style={{ width: "50vw" }}
              // TODO: make this a functioning search bar
            />
            <Search style={{ color: "orange" }} />
          </div>

          <GridList
            className={classes.gridList}
            // if user is on mobile then gridList has 1 column, otherwise it has 3 columns
            cols={isMobileOnly ? 1 : 3}
          >
            {
              // iterates through list of courses, creates Card/gridListTile, and adds it to gridList
              // TODO: make Card clickable/link to page with reviews for that course
              this.state.courseList.map((course) => (
                <GridListTile style={{ height: "auto", padding: "10px" }}>
                  <Card className={classes.courseCard}>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justify="center"
                    >
                      <h4 style={{ marginBottom: "0px", marginTop: "0px" }}>
                        {course.name}
                      </h4>
                      <h4>{course.code}</h4>
                      <div>
                        {
                          // displays avgRating(rounded down to nearest whole number) filled stars
                          Array(Math.floor(course.avgRating)).fill(
                            <Star style={{ color: "white" }} />
                          )
                        }
                        {
                          // displays half star if avgRating decimal >= 0.25
                          course.avgRating - Math.floor(course.avgRating) >=
                            0.25 && <StarHalf style={{ color: "white" }} />
                        }
                        {
                          // displays outlined star if avgRating decimal < 0.25
                          course.avgRating - Math.floor(course.avgRating) > 0 &&
                            course.avgRating - Math.floor(course.avgRating) <
                              0.25 && <StarOutline />
                        }
                        {
                          // displays 5 - (avgRating rounded up to nearest whole number) outlined stars
                          Array(5 - Math.ceil(course.avgRating)).fill(
                            <StarOutline />
                          )
                        }
                        {course.avgRating}/5
                      </div>
                    </Grid>
                  </Card>
                </GridListTile>
              ))
            }
          </GridList>
        </Grid>

        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Dashboard));
