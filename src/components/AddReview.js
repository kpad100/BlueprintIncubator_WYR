import { Grid, Card, Button, TextField, Typography } from "@material-ui/core";
import { Star, StarOutline } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { db, myFirebase } from "../firebase/firebase";
import LoginPage from "./LoginPage";

// CSS
const background = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100vh",
  backgroundColor: "rgba(52, 52, 52, 0.4)",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 4,
};
const innerBlock = {
  position: "relative",
  padding: "32px",
  width: " 70%",
  maxWidth: "800px",
  backgroundColor: "#FFF",
  zIndex: 5,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const AddReview = (props) => {
  const { trigger, closed, fromCourse } = props;
  const [diffRating, setDiffRating] = useState(null);
  const [workloadRating, setWorkloadRating] = useState(null);
  const [teachRating, setTeachRating] = useState(null);
  const [diffHover, setDiffHover] = useState(null);
  const [workloadHover, setWorkloadHover] = useState(null);
  const [teachHover, setTeachHover] = useState(null);
  const [newCourse, setNewCourse] = useState("");
  const [newCourseCode, setNewCourseCode] = useState("");
  const [prof, setProf] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [emailSent, sendEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      diffRating === null ||
      workloadRating === null ||
      teachRating === null
    ) {
      alert("Fill out all fields and star ratings!");
    }
    // if AddReview clicked on from ReviewPage, adds review to "reviews" subcollection for course
    else if (fromCourse !== undefined) {
      db.collection("courses/" + fromCourse.code + "/reviews")
        .add({
          diffRating: diffRating,
          workloadRating: workloadRating,
          teachRating: teachRating,
          grade: grade,
          prof: prof,
          description: description,
          user: myFirebase.auth().currentUser.displayName,
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      clearFields();
    }
    // else, creates new course in "courses" then adds review to "reviews" subcollection
    else {
      db.collection("courses")
        .doc(newCourseCode)
        .set({
          name: newCourse,
          code: newCourseCode,
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      db.collection("courses").doc(newCourseCode).collection("reviews").add({
        diffRating: diffRating,
        workloadRating: workloadRating,
        teachRating: teachRating,
        grade: grade,
        prof: prof,
        description: description,
        user: myFirebase.auth().currentUser.displayName,
      });

      clearFields();
    }
  };

  function clearFields() {
    setDiffRating(null);
    setWorkloadRating(null);
    setTeachRating(null);
    setGrade(null);
    setNewCourse("");
    setNewCourseCode("");
    setProf("");
    setDescription("");
  }

  function checkLoginStatus() {
    myFirebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedIn(true);
        if (myFirebase.auth().currentUser.emailVerified) {
          setIsVerified(true);
        }
      }
    });
  }

  useEffect(() => {
    checkLoginStatus();
  });

  if (trigger && isLoggedIn && !isVerified) {
    return (
      <div style={background}>
        <Card style={{ padding: "15px" }}>
          <h1>Verify Your Email!</h1>
          <Button
            style={{ backgroundColor: "#fb9263" }}
            disabled={emailSent}
            onClick={() => {
              myFirebase.auth().currentUser.sendEmailVerification();
              sendEmail(true);
            }}
          >
            Resend Verification Email
          </Button>
          <br />
          <br />
          <Button
            style={{ backgroundColor: "#fb9263" }}
            onClick={() => {
              window.location.reload();
            }}
          >
            Refresh Page
          </Button>
        </Card>
      </div>
    );
  } else if (trigger && isVerified) {
    return (
      <div style={background}>
        <Card style={innerBlock}>
          <form onSubmit={handleSubmit}>
            <div>
              <Typography>
                Workload (1 is the MOST work, 5 is the LEAST work): *
              </Typography>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={"workloadLabel" + i}>
                    <input
                      type="radio"
                      key={"workloadRating" + i}
                      style={{ display: "none" }}
                      value={ratingValue}
                      onClick={() => setWorkloadRating(ratingValue)}
                    />

                    {
                      // Colors for Star
                      ratingValue <= (workloadHover || workloadRating) ? (
                        <Star
                          key={"workloadStar" + i}
                          style={{
                            fontSize: 34,
                            cursor: "pointer",
                            color: "#fb9263",
                          }}
                          onMouseEnter={() => setWorkloadHover(ratingValue)}
                          onMouseLeave={() => setWorkloadHover(null)}
                        />
                      ) : (
                        <StarOutline
                          key={"workloadStarOutline" + i}
                          style={{ fontSize: 34, cursor: "pointer" }}
                          onMouseEnter={() => setWorkloadHover(ratingValue)}
                          onMouseLeave={() => setWorkloadHover(null)}
                        />
                      )
                    }
                  </label>
                );
              })}
            </div>

            <div style={{ marginTop: "10px" }}>
              <Typography>
                Difficulty of Content (1 is the HARDEST, 5 is the EASIEST): *
              </Typography>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={"diffLabel" + i}>
                    <input
                      type="radio"
                      key={"diffRating" + i}
                      style={{ display: "none" }}
                      value={ratingValue}
                      onClick={() => setDiffRating(ratingValue)}
                    />
                    {
                      // Colors for Star
                      ratingValue <= (diffHover || diffRating) ? (
                        <Star
                          key={"diffStar" + i}
                          style={{
                            fontSize: 34,
                            cursor: "pointer",
                            color: "#fb9263",
                          }}
                          onMouseEnter={() => setDiffHover(ratingValue)}
                          onMouseLeave={() => setDiffHover(null)}
                        />
                      ) : (
                        <StarOutline
                          key={"diffStarOutline" + i}
                          style={{ fontSize: 34, cursor: "pointer" }}
                          onMouseEnter={() => setDiffHover(ratingValue)}
                          onMouseLeave={() => setDiffHover(null)}
                        />
                      )
                    }
                  </label>
                );
              })}
            </div>

            <div style={{ marginTop: "10px" }}>
              <Typography>
                Teaching (1 is the WORST, 5 is the BEST): *
              </Typography>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={"teachRatingLabel" + i}>
                    <input
                      type="radio"
                      key={"teachRating" + i}
                      style={{ display: "none" }}
                      value={ratingValue}
                      onClick={() => setTeachRating(ratingValue)}
                    />

                    {
                      // Colors for Star
                      ratingValue <= (teachHover || teachRating) ? (
                        <Star
                          key={"profStar" + i}
                          style={{
                            fontSize: 34,
                            cursor: "pointer",
                            color: "#fb9263",
                          }}
                          onMouseEnter={() => setTeachHover(ratingValue)}
                          onMouseLeave={() => setTeachHover(null)}
                        />
                      ) : (
                        <StarOutline
                          key={"profStarOutline" + i}
                          style={{ fontSize: 34, cursor: "pointer" }}
                          onMouseEnter={() => setTeachHover(ratingValue)}
                          onMouseLeave={() => setTeachHover(null)}
                        />
                      )
                    }
                  </label>
                );
              })}
            </div>

            <TextField
              id="courseName"
              required
              style={{ width: "60%", marginBottom: "10px", marginTop: "5px" }}
              label="Course:"
              value={fromCourse !== undefined ? fromCourse.name : newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
            />
            <TextField
              id="courseCode"
              required
              style={{ width: "60%", marginBottom: "10px", marginTop: "5px" }}
              label="Code:"
              value={fromCourse !== undefined ? fromCourse.code : newCourseCode}
              onChange={(e) => setNewCourseCode(e.target.value)}
            />
            <TextField
              id="prof"
              required
              style={{ width: "60%", marginBottom: "10px", marginTop: "5px" }}
              label="Professor:"
              value={prof}
              onChange={(e) => setProf(e.target.value)}
            />
            <TextField
              id="description"
              required
              style={{ width: "80%", marginBottom: "20px" }}
              label="Enter Your Review:"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={5}
            />

            <Grid>
              <Button
                variant="contained"
                disableElevation
                style={{ marginRight: "20px", backgroundColor: "#fb9263" }}
                type="submit"
              >
                Submit
              </Button>

              <Button
                onClick={closed}
                variant="contained"
                disableElevation
                style={{ marginLeft: "20px", backgroundColor: "#fb9263" }}
              >
                Close
              </Button>
            </Grid>
          </form>
        </Card>
      </div>
    );
  } else {
    return <LoginPage trigger={trigger} />;
  }
};

export default AddReview;
