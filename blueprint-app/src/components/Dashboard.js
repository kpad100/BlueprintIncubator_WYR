import {
  Avatar,
  Card,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  GridList,
  Typography,
  GridListTile,
  InputBase,
} from "@material-ui/core";
import { Search, Star, StarOutline, StarHalf } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { isMobileOnly } from "react-device-detect";
import { logoutUser } from "../actions";
import { db } from "../firebase/firebase";
import ReviewPage from "./ReviewPage";

const theme = createMuiTheme();
theme.typography.body1 = {
  fontSize: "0.8rem",
  "@media (min-width:600px)": {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.25rem",
  },
};

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
      backgroundColor: "#D6EAF8 ",
      outline: "1px solid slategrey",
    },
  },
  searchBar: {
    backgroundColor: "#D6EAF8 ",
    opacity: 0.5,
    borderRadius: 25,
    padding: "10px",
  },
  courseCard: {
    backgroundColor: "#fb9263",
    borderRadius: 25,
    padding: "20px",
    height: "100px",
  },
  gridList: {
    width: "90vw",
    height: "75vh",
    padding: "15px",
    backgroundColor: "white",
  },
});

class Dashboard extends Component {
  state = {
    anchorEl: null, // anchor for menu, closed by default
    courseList: [], // list of courses
    selectedCourse: {}, // course to pass to ReviewPage
    mountReviewPage: false, // mounts ReviewPage when true
  };

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

  // handles when a course is clicked on
  onCourseClick = (e) => {
    const text = e.target.innerText;
    for (let i = 0; i < this.state.courseList.length; i++) {
      let course = this.state.courseList[i];
      if (text.includes(course.name) || text.includes(course.code)) {
        this.setState({ selectedCourse: course, mountReviewPage: true });
      }
    }
  };

  // Called immediately after a component is mounted. Setting state here will trigger re-rendering.
  componentDidMount() {
    // receives course data from Firebase and updates courseList in state
    db.collection("courses").onSnapshot((querySnapshot) => {
      var courses = [];
      querySnapshot.forEach((doc) => {
        courses.push(doc.data());
      });
      this.setState({ courseList: courses });
    });
  }

  // componentDidUpdate() {
  //   console.log(this.state.selectedCourse);
  // }

  render() {
    const { classes, isLoggingOut, logoutError } = this.props;
    if (this.state.mountReviewPage) {
      return <ReviewPage selectedCourse={this.state.selectedCourse} />;
    } else {
      return (
        <div>
          <header>
            <IconButton onClick={this.handleOpenMenu} aria-controls="menu">
              <Avatar />
            </IconButton>
            <img
              src="https://cdn.discordapp.com/attachments/812822571094900746/837106499863969812/wyr_transparent.png"
              height="50"
              style={{
                marginTop: "15px",
                marginBottom: "15px",
                float: "right",
              }}
              alt=""
            />
            <Menu
              id="menu"
              onClose={this.handleCloseMenu}
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
            >
              <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
            <h1 style={{ textAlign: "center" }}>Classes</h1>
          </header>

          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
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
                  <GridListTile
                    style={{ height: "auto", padding: "10px" }}
                    onClick={this.onCourseClick}
                  >
                    <Card className={classes.courseCard}>
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                      >
                        <ThemeProvider theme={theme}>
                          <Typography
                            variant="body1"
                            style={{
                              marginBottom: "0px",
                              marginTop: "5px",
                            }}
                          >
                            {course.name}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ marginBottom: "10px", marginTop: "10px" }}
                          >
                            {course.code}
                          </Typography>
                        </ThemeProvider>
                        {/* <div>
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
                      </div> */}
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
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Dashboard));
