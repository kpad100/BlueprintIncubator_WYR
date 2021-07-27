import Button from "@material-ui/core/Button";
import { Grid, Card } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Star, StarOutline, StarHalf } from "@material-ui/icons";
import { useState } from "react";
import { db, myFirebase } from "../firebase/firebase";

const AddReview = (props) => {
  const { trigger, close, fromCourse, fromCourseID } = props;
  const [diffRating, setDiffRating] = useState(null);
  const [workloadRating, setWorkloadRating] = useState(null);
  const [diffHover, setDiffHover] = useState(null);
  const [workloadHover, setWorkloadHover] = useState(null);
  const [newCourse, setNewCourse] = useState("");
  const [newCourseCode, setNewCourseCode] = useState("");
  const [prof, setProf] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fromCourseID !== undefined) {
      db.collection("courses/" + fromCourseID + "/reviews")
        .add({
          diffRating: diffRating,
          workloadRating: workloadRating,
          overallRating: (diffRating + workloadRating) / 2,
          prof: prof,
          description: description,
          user: myFirebase.auth().currentUser.uid,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  };

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

  return (
    trigger && (
      <div style={background}>
        <Card style={innerBlock}>
          {/* Stars */}
          <div>
            <h3>Difficulty of Content (1 is the HARDEST, 5 is the EASIEST)</h3>
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label>
                  <input
                    type="radio"
                    name="rating"
                    style={{ display: "none" }}
                    value={ratingValue}
                    onClick={() => setDiffRating(ratingValue)}
                  />

                  {/* Colors for Star  */}
                  <Star
                    color={
                      ratingValue <= (diffHover || diffRating)
                        ? "primary"
                        : "secondary"
                    }
                    style={{ fontSize: 34, cursor: "pointer" }}
                    onMouseEnter={() => setDiffHover(ratingValue)}
                    onMouseLeave={() => setDiffHover(null)}
                  />
                </label>
              );
            })}
          </div>

          <div>
            <h3>Workload (1 is the MOST work, 5 is the LEAST work)</h3>
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label>
                  <input
                    type="radio"
                    name="rating"
                    style={{ display: "none" }}
                    value={ratingValue}
                    onClick={() => setWorkloadRating(ratingValue)}
                  />

                  {/* Colors for Star  */}
                  <Star
                    color={
                      ratingValue <= (workloadHover || workloadRating)
                        ? "primary"
                        : "secondary"
                    }
                    style={{ fontSize: 34, cursor: "pointer" }}
                    onMouseEnter={() => setWorkloadHover(ratingValue)}
                    onMouseLeave={() => setWorkloadHover(null)}
                  />
                </label>
              );
            })}
          </div>

          <form onSubmit={handleSubmit}>
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
                onClick={close}
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
    )
  );
};

export default AddReview;
