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
import { Search } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import { connect } from "react-redux";
import { isMobileOnly } from "react-device-detect";
import { logoutUser } from "../actions";
import { db } from "../firebase/firebase";
import ReviewPage from "./ReviewPage";

// CSS styling
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
    backgroundColor: "#7ae7ff",
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
    height: "auto",
    padding: "15px",
  },
});

class Dashboard extends Component {
  state = {
    anchorEl: null, // anchor for menu, closed by default
    courseList: [], // list of courses
    courseIDs: [], // list of Firestore IDs for each course
    selectedCourse: {}, // course to pass to ReviewPage
    selectedCourseID: "", // Firestore ID of course to pass to ReviewPage
    mountReviewPage: false, // mounts ReviewPage when true
    searchTerm: "", // value of input to search bar
  };

  // handles logout
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
      let courseID = this.state.courseIDs[i];
      if (text.includes(course.name) || text.includes(course.code)) {
        this.setState({
          selectedCourse: course,
          selectedCourseID: courseID,
          mountReviewPage: true,
        });
      }
    }
  };

  // Called immediately after a component is mounted. Setting state here will trigger re-rendering.
  componentDidMount() {
    // receives course data from Firebase and updates courseList and courseIDs in state
    db.collection("courses").onSnapshot((querySnapshot) => {
      const courses = [];
      const firestoreIDs = [];
      querySnapshot.forEach((doc) => {
        courses.push(doc.data());
        firestoreIDs.push(doc.id);
      });
      this.setState({ courseList: courses, courseIDs: firestoreIDs });
    });
  }

  // componentDidUpdate() {
  //   // console.log(this.state.selectedCourse);
  //   // console.log(this.state.selectedCourseID);
  //   console.log(this.state.searchTerm);
  // }

  render() {
    const { classes, isLoggingOut, logoutError } = this.props;
    if (this.state.mountReviewPage) {
      return (
        <ReviewPage
          selectedCourse={this.state.selectedCourse}
          selectedCourseID={this.state.selectedCourseID}
        />
      );
    } else {
      return (
        <div>
          <Grid id="topGrid" container>
            <IconButton onClick={this.handleOpenMenu} aria-controls="menu">
              <Avatar />
            </IconButton>
            <Menu
              id="menu"
              onClose={this.handleCloseMenu}
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
            >
              <MenuItem key="logoutItem" onClick={this.handleLogout}>
                Logout
              </MenuItem>
            </Menu>

            <h1 style={{ marginLeft: "auto" }}>Classes</h1>
            <img
              src="https://cdn.discordapp.com/attachments/812822571094900746/837106499863969812/wyr_transparent.png"
              height="50"
              style={{
                marginLeft: "auto",
                marginRight: "5px",
                marginTop: "5px",
              }}
              alt=""
            />
          </Grid>

          <Grid
            id="mainGrid"
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <div className={classes.searchBar}>
              <InputBase
                placeholder="Course Name or Code..."
                onChange={(e) => {
                  this.setState({ searchTerm: e.target.value });
                }}
                style={{ width: "50vw" }}
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
                // filters based on search term
                this.state.courseList
                  .filter((course) => {
                    if (this.state.searchTerm === "") {
                      return course;
                    } else if (
                      course.name
                        .toLowerCase()
                        .includes(this.state.searchTerm.toLowerCase())
                    ) {
                      return course;
                    } else if (
                      course.code
                        .replaceAll(":", "")
                        .includes(this.state.searchTerm.replaceAll(":", ""))
                    ) {
                      return course;
                    }
                  })
                  .map((course) => (
                    <GridListTile
                      key={"GLT" + course.code}
                      style={{ height: "auto", padding: "10px" }}
                    >
                      <Card
                        key={"card" + course.code}
                        className={classes.courseCard}
                        onClick={this.onCourseClick}
                      >
                        <Grid
                          key={"cardGrid" + course.code}
                          container
                          direction="column"
                          alignItems="center"
                          justify="center"
                        >
                          <h3 key={course.name} style={{ marginTop: "auto" }}>
                            {course.name}
                          </h3>
                          <h3 key={course.code}>{course.code}</h3>
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
