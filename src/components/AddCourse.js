import { useState, useEffect } from "react";
import { Button, Card, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { db, myFirebase } from "../firebase/firebase";
import LoginPage from "./LoginPage";

const useStyles = makeStyles((theme) => ({
  background: {
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
  },
  innerBlock: {
    position: "relative",
    padding: "32px",
    width: "40%",
    height: "80%",

    maxWidth: "800px",
    backgroundColor: "#FFF",
    zIndex: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const AddCourse = ({ trigger, closed }) => {
  const classes = useStyles();
  const [newCourse, setNewCourse] = useState("");
  const [newCourseCode, setNewCourseCode] = useState("");
  const [sirsRating, setSirsRating] = useState();
  const [redditLinks, setRedditLinks] = useState([""]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [emailSent, sendEmail] = useState(false);

  useEffect(() => {
    const unsubscribe = myFirebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedIn(true);
        if (myFirebase.auth().currentUser.emailVerified) {
          setIsVerified(true);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLinkInput = (e, index) => {
    const link = e.target.value;
    const list = [...redditLinks];
    list[index] = link;
    setRedditLinks(list);
  };

  const handleClickAddLink = () => {
    setRedditLinks([...redditLinks, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCourseCode.length === 10 && newCourse.length > 0) {
      db.collection("courses")
        .doc(newCourseCode)
        .set({
          name: newCourse,
          code: newCourseCode,
          sirsRating: sirsRating,
          redditLinks: redditLinks,
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      setNewCourse("");
      setNewCourseCode("");
      setSirsRating();
      setRedditLinks([""]);
      closed();
    } else {
      alert("Please enter a valid course");
    }
  };

  if (trigger && isLoggedIn && !isVerified) {
    return (
      <div className={classes.background}>
        <Card className={{ padding: "15px" }}>
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
      <div className={classes.background}>
        <Card className={classes.innerBlock}>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <TextField
                id="courseName"
                required
                variant="outlined"
                style={{ width: "100%" }}
                label="Course:"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
              />
              <Grid container direction="row" style={{ marginTop: "10px" }}>
                <TextField
                  id="courseCode"
                  required
                  variant="outlined"
                  style={{ width: "45%" }}
                  label="Code:"
                  value={newCourseCode}
                  onChange={(e) => setNewCourseCode(e.target.value)}
                />
                <TextField
                  id="sirsRating"
                  required
                  variant="outlined"
                  style={{ width: "50%", marginLeft: "20px" }}
                  label="Course SIRS rating:"
                  value={sirsRating}
                  onChange={(e) => setSirsRating(e.target.value)}
                />
              </Grid>

              {redditLinks.map((link, index) => {
                return (
                  <Grid key={"redditGrid" + index} container direction="column">
                    <Grid
                      key={"redditGrid2" + index}
                      container
                      direction="row"
                      alignItems="center"
                    >
                      <TextField
                        variant="outlined"
                        key={"redditLinks" + index}
                        label="Reddit:"
                        style={{ width: "80%", marginTop: "10px" }}
                        value={link}
                        onChange={(e) => handleLinkInput(e, index)}
                      />
                      {redditLinks.length - 1 === index && (
                        <Button
                          variant="contained"
                          disableElevation
                          style={{
                            marginLeft: "10px",
                            width: "10px",
                            height: "30px",
                          }}
                          onClick={handleClickAddLink}
                        >
                          Add
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                );
              })}

              <Grid style={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  disableElevation
                  style={{ backgroundColor: "#fb9263" }}
                  type="submit"
                >
                  Submit
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
            </Grid>
          </form>
        </Card>
      </div>
    );
  } else {
    return <LoginPage trigger={trigger} closed={closed} />;
  }
};

export default AddCourse;
