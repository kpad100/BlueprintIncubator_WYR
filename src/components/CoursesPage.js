import {
  Card,
  Grid,
  GridList,
  GridListTile,
  InputBase,
  Button,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { isMobileOnly } from "react-device-detect";
import { logoutUser } from "../actions";
import AddReview from "./AddReview";
import ReviewPage from "./ReviewPage";
import NavBar from "./NavBar";
import { db } from "../firebase/firebase";
import IdleTimer from "../actions/IdleTimer";

// CSS styling
const styles = () => ({
  searchBar: {
    backgroundColor: "#bdf4ff",
    opacity: 0.5,
    borderRadius: 25,
    padding: "10px",
  },
  courseCard: {
    backgroundColor: "#FF7F50",
    borderRadius: 25,
    padding: "15px",
    height: "100px",
  },
  gridList: {
    width: "90vw",
    height: "auto",
    padding: "15px",
  },
  addCourseButton: {
    width: isMobileOnly ? "75vw" : "20vw",
    height: "3rem",
    borderRadius: 25,
    backgroundColor: "#FF7F50",
    marginBottom: "25px",
    fontSize: 16,
  },
});

const CoursesPage = (props) => {
  const [courseList, setCourseList] = useState([]); // list of courses
  const [selectedCourse, setSelectedCourse] = useState({}); // course to pass to ReviewPage
  const [goToReviewPage, setGoToReviewPage] = useState(false); // mounts ReviewPage when true
  const [searchTerm, setSearchTerm] = useState(""); // value of input to search bar
  const [buttonPopup, setButtonPopup] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const { classes, isLoggingOut, logoutError, dispatch } = props;

  // handles when a course is clicked on
  const onCourseClick = (e) => {
    const text = e.target.innerText;
    for (let i = 0; i < courseList.length; i++) {
      let course = courseList[i];
      if (text.includes(course.name) || text.includes(course.code)) {
        setSelectedCourse(course);
        setGoToReviewPage(true);
      }
    }
  };

  useEffect(() => {
    // Timer for timeout, timeout counter set to 900s (15min now)
    const timer = new IdleTimer({
      timeout: 900,
      onTimeout: () => {
        //console.log("In onTimeout")
        setIsTimeout(true);
      },
      onExpired: () => {
        setIsTimeout(true);
      },
    });

    if (isTimeout) {
      dispatch(logoutUser());
    }

    // receives course data from Firebase and updates courseList and courseIDs in state
    const unsubscribe = db.collection("courses").onSnapshot((querySnapshot) => {
      const courses = [];
      querySnapshot.forEach((doc) => {
        courses.push(doc.data());
      });
      setCourseList(courses);
    });

    return () => {
      //dispatch(logoutUser());
      unsubscribe();
      //console.log("cleaning up...")
      timer.cleanUp();
    };
  }, [dispatch, isTimeout]);

  if (goToReviewPage) {
    return <ReviewPage selectedCourse={selectedCourse} />;
  } else {
    return (
      <div>
        <NavBar
          dispatch={dispatch}
          backgroundColor={"#69b4cf"}
          title={"Courses"}
        />
        <br />
        <Grid container direction="column" alignItems="center" justify="center">
          <div className={classes.searchBar}>
            <InputBase
              placeholder="Course Name or Code..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              style={isMobileOnly ? { width: "70vw" } : { width: "40vw" }}
            />
            <Search style={{ color: "#fb9263" }} />
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
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#ffc1ab";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "#FF7F50";
                      }}
                      onClick={onCourseClick}
                    >
                      <Grid
                        key={"cardGrid" + course.code}
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                      >
                        <center>
                          <Typography
                            key={course.code}
                            style={{
                              marginBottom: "10px",
                              fontFamily: "sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            {course.code}
                          </Typography>
                          <Typography
                            key={course.name}
                            style={{
                              fontFamily: "Poppins",
                              fontWeight: "bold",
                            }}
                          >
                            {course.name}
                          </Typography>
                        </center>
                      </Grid>
                    </Card>
                  </GridListTile>
                ))
            }
          </GridList>

          <div align="center">
            <h1>Can't Find the Course You're Looking For?</h1>
            <Button
              className={classes.addCourseButton}
              onClick={() => {
                setButtonPopup(true);
              }}
            >
              Add Review for new Course
            </Button>
            <AddReview
              trigger={buttonPopup}
              closed={() => {
                setButtonPopup(false);
              }}
            />
          </div>
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

export default withStyles(styles)(connect(mapStateToProps)(CoursesPage));
