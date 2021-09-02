import {
  Grid,
  Card,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@material-ui/core";
import { Star, StarOutline } from "@material-ui/icons";
import { isMobileOnly } from "react-device-detect";
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
  width: isMobileOnly ? "80%" : "40%",
  height: "80%",

  maxWidth: "800px",
  backgroundColor: "#FFF",
  zIndex: 5,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const AddReview = (props) => {
  const { trigger, closed, fromCourse, profList } = props;
  const [diffRating, setDiffRating] = useState(0);
  const [workloadRating, setWorkloadRating] = useState(0);
  const [teachRating, setTeachRating] = useState(0);
  const [diffHover, setDiffHover] = useState(null);
  const [workloadHover, setWorkloadHover] = useState(null);
  const [teachHover, setTeachHover] = useState(null);
  const [newCourse, setNewCourse] = useState("");
  const [newCourseCode, setNewCourseCode] = useState("");
  const [prof, setProf] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [anon, setAnon] = useState(false);
  const [tookOnline, setTookOnline] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [emailSent, sendEmail] = useState(false);
  const [otherProf, setOtherProf] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (diffRating === 0 || workloadRating === 0 || teachRating === 0) {
      alert("Fill out all fields and star ratings!");
    }
    // if AddReview clicked on from ReviewPage, adds review to "reviews" subcollection for course
    else if (fromCourse !== undefined) {
      if (otherProf) {
        profList.push(prof);
        db.collection("courses").doc(fromCourse.code).update({
          profs: profList,
        });
      }

      db.collection("courses/" + fromCourse.code + "/reviews")
        .add({
          diffRating: diffRating,
          workloadRating: workloadRating,
          teachRating: teachRating,
          grade: grade,
          prof: prof,
          description: description,
          user: myFirebase.auth().currentUser.displayName,
          anon: anon,
          tookOnline: tookOnline,
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      clearFields();
      closed();
    }
    // else, creates new course in "courses" then adds review to "reviews" subcollection
    else {
      db.collection("courses")
        .doc(newCourseCode)
        .set({
          name: newCourse,
          code: newCourseCode,
          profs: [prof],
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
        anon: anon,
        tookOnline: tookOnline,
      });

      clearFields();
      closed();
    }
  };

  function clearFields() {
    setDiffRating(null);
    setWorkloadRating(null);
    setTeachRating(null);
    setDiffHover(null);
    setWorkloadHover(null);
    setTeachHover(null);
    setGrade(null);
    setNewCourse("");
    setNewCourseCode("");
    setProf("");
    setDescription("");
    setOtherProf(false);
    setAnon(false);
    setTookOnline(false);
  }

  useEffect(() => {
    const unsubscribe = myFirebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedIn(true);
        if (myFirebase.auth().currentUser.emailVerified) {
          setIsVerified(true);
        }
      }
    });

    if (prof === "other") {
      setOtherProf(true);
      setProf("");
    }

    return () => {
      unsubscribe();
    };
  }, [prof]);

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
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <div>
              {/* for spacing on the top */}
              <Typography style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
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
              <Typography style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
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
              <Typography style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
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

            <div style={{ marginTop: "10px" }}>
              <TextField
                id="courseName"
                required
                variant={isMobileOnly ? "standard" : "outlined"}
                style={{ width: "60%" }}
                label="Course:"
                disabled={fromCourse !== undefined ? true : false}
                value={fromCourse !== undefined ? fromCourse.name : newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
              />
              <TextField
                id="courseCode"
                required
                variant={isMobileOnly ? "standard" : "outlined"}
                style={{ width: "30%", marginLeft: "10px" }}
                label="Code:"
                disabled={fromCourse !== undefined ? true : false}
                value={
                  fromCourse !== undefined ? fromCourse.code : newCourseCode
                }
                onChange={(e) => setNewCourseCode(e.target.value)}
              />
            </div>

            <div style={{ marginTop: "5px" }}>
              {otherProf || fromCourse === undefined ? (
                <TextField
                  id="professor"
                  required
                  variant={isMobileOnly ? "standard" : "outlined"}
                  style={{ width: "50%" }}
                  label="Professor"
                  value={prof}
                  onChange={(e) => setProf(e.target.value)}
                />
              ) : (
                <FormControl required style={{ width: "45%" }}>
                  <InputLabel style={{ marginLeft: !isMobileOnly && "5px" }}>
                    Professor
                  </InputLabel>
                  <Select
                    value={prof}
                    onChange={(e) => {
                      setProf(e.target.value);
                    }}
                    variant={isMobileOnly ? "standard" : "outlined"}
                  >
                    {profList.map((prof) => {
                      return (
                        <MenuItem key={prof + "key"} value={prof}>
                          {prof}
                        </MenuItem>
                      );
                    })}
                    <MenuItem value={"other"}>
                      Other (Enter Professor Manually)
                    </MenuItem>
                  </Select>
                </FormControl>
              )}

              <FormControl
                required
                style={{ width: "45%", marginLeft: "10px" }}
              >
                <InputLabel style={{ marginLeft: !isMobileOnly && "5px" }}>
                  Grade Received
                </InputLabel>
                <Select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  variant={isMobileOnly ? "standard" : "outlined"}
                >
                  <MenuItem value={"A"}>A</MenuItem>
                  <MenuItem value={"B+"}>B+</MenuItem>
                  <MenuItem value={"B"}>B</MenuItem>
                  <MenuItem value={"C+"}>C+</MenuItem>
                  <MenuItem value={"C"}>C</MenuItem>
                  <MenuItem value={"PA"}>PA</MenuItem>
                  <MenuItem value={"D"}>D</MenuItem>
                  <MenuItem value={"F"}>F</MenuItem>
                  <MenuItem value={"N/A"}>N/A</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ marginTop: "10px" }}>
              <FormControlLabel
                label="Took Class Online"
                control={
                  <Checkbox
                    style={{ color: "#69b4cf" }}
                    checked={tookOnline}
                    onClick={() => {
                      setTookOnline(!tookOnline);
                    }}
                  />
                }
              />

              <FormControlLabel
                style={{ marginLeft: "10px" }}
                label="Post Anonymously"
                control={
                  <Checkbox
                    style={{ color: "#69b4cf" }}
                    checked={anon}
                    onClick={() => {
                      setAnon(!anon);
                    }}
                  />
                }
              />
            </div>

            <TextField
              id="description"
              required
              style={{ width: "80%", marginBottom: "20px" }}
              label="Enter Your Detailed Review:"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={5}
            />

            <Grid>
              <Button
                variant="contained"
                disableElevation
                style={{ backgroundColor: "#fb9263" }}
                type="submit"
              >
                Submit
              </Button>

              <Button
                onClick={() => {
                  clearFields();
                }}
                variant="contained"
                disableElevation
                style={{ marginLeft: "10px", backgroundColor: "#69b4cf" }}
              >
                Reset
              </Button>

              <Button
                onClick={closed}
                variant="contained"
                disableElevation
                style={{ marginLeft: "10px", backgroundColor: "#bdf4ff" }}
              >
                Close
              </Button>
            </Grid>
          </form>
        </Card>
      </div>
    );
  } else {
    return <LoginPage trigger={trigger} closed={closed} />;
  }
};

export default AddReview;
