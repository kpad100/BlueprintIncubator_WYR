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
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { isMobileOnly } from "react-device-detect";
import { logoutUser } from "../actions";
import ReviewPage from "./ReviewPage";
import { db, myFirebase } from "../firebase/firebase";
import { Redirect } from "react-router-dom";

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

const Dashboard = (props) => {
  const [anchorEl, setAnchorEl] = useState(null); // anchor for menu, closed by default
  const [courseList, setCourseList] = useState([]); // list of courses
  const [courseIDs, setCourseIDs] = useState([]); // list of Firestore IDs for each course
  const [selectedCourse, setSelectedCourse] = useState({}); // course to pass to ReviewPage
  const [selectedCourseID, setSelectedCourseID] = useState(""); // Firestore ID of course to pass to ReviewPage
  const [mountReviewPage, setMountReviewPage] = useState(false); // mounts ReviewPage when true
  const [searchTerm, setSearchTerm] = useState(""); // value of input to search bar
  const { classes, isLoggingOut, logoutError, dispatch } = props;

  // handles logout
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // opens account menu (currently only option in menu is to Logout)
  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  // closes account menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // handles when a course is clicked on
  const onCourseClick = (e) => {
    const text = e.target.innerText;
    for (let i = 0; i < courseList.length; i++) {
      let course = courseList[i];
      let courseID = courseIDs[i];
      if (text.includes(course.name) || text.includes(course.code)) {
        setSelectedCourse(course);
        setSelectedCourseID(courseID);
        setMountReviewPage(true);
      }
    }
  };

  useEffect(() => {
    if (!myFirebase.auth().currentUser.emailVerified) {
      handleLogout();
      alert("Verify your Email first!");
      return <Redirect to="/login" />;
    }

    // receives course data from Firebase and updates courseList and courseIDs in state
    db.collection("courses").onSnapshot((querySnapshot) => {
      const courses = [];
      const firestoreIDs = [];
      querySnapshot.forEach((doc) => {
        courses.push(doc.data());
        firestoreIDs.push(doc.id);
      });
      setCourseList(courses);
      setCourseIDs(firestoreIDs);
    });
  }, []);

  if (mountReviewPage) {
    return (
      <ReviewPage
        selectedCourse={selectedCourse}
        selectedCourseID={selectedCourseID}
      />
    );
  } else {
    return (
      <div>
        <Grid container>
          <IconButton onClick={handleOpenMenu} aria-controls="menu">
            <Avatar />
          </IconButton>
          <Menu
            id="menu"
            onClose={handleCloseMenu}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
          >
            <MenuItem key="logoutItem" onClick={handleLogout}>
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

        <Grid container direction="column" alignItems="center" justify="center">
          <div className={classes.searchBar}>
            <InputBase
              placeholder="Course Name or Code..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
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
              courseList
                .filter((course) => {
                  if (searchTerm === "") {
                    return course;
                  } else if (
                    course.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return course;
                  } else if (
                    course.code
                      .replaceAll(":", "")
                      .includes(searchTerm.replaceAll(":", ""))
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
                      onClick={onCourseClick}
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
};

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Dashboard));
