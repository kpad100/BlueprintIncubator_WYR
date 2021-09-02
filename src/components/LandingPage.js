import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import Aos from "aos";
import "aos/dist/aos.css";
import Typewriter from "../actions/Typewriter.js";
import NavBar from "./NavBar.js";
import SignupPage from "./SignupPage";
import { myFirebase } from "../firebase/firebase";
import { isMobileOnly } from "react-device-detect";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(145deg, #5F9EA0 20%, #ff7f50 70%)",
    color: "white",
    height: isMobileOnly ? "4000px" : "3100px",
    maxWidth: "100%",
    overflowX: "hidden",
  },
});

const LandingPage = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });

    const unsubscribe = myFirebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedIn(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const classes = useStyles();
  const [directToCoursesPage, setDirectToCoursesPage] = useState(false);
  const [signupPopup, setSignupPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (directToCoursesPage === true) return <Redirect to="/courses" />;

  return (
    // The top bar with logo and sign up and login
    <div className={classes.root}>
      <NavBar fromLandingPage={true} />

      {/* Large would you recommend section  */}
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={0}
        style={{
          marginTop: "10px",
          minHeight: "700px",
        }}
      >
        <Grid item xs={12}>
          <center style={{ fontSize: isMobileOnly ? 25 : 40 }}>
            <Typewriter text={"Would You Recommend?"} />
          </center>
        </Grid>
        <Grid item xs={8}>
          <center>
            <h1>
              wyr is an informative and intuitive tool to help find, choose, and
              organize your courses.
            </h1>
          </center>
        </Grid>
        <Button
          variant="contained"
          style={{
            borderRadius: 25,
            backgroundColor: "#FF7F50",
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
            marginTop: "50px",
            marginBottom: "50px",
            fontFamily: "Poppins",
          }}
          onClick={() => setDirectToCoursesPage(true)}
        >
          check out reviews
        </Button>
        <Grid item xs={12}>
          <center>
            <Typewriter text={"Real Students, Real Reviews"} />
          </center>
        </Grid>
        <Grid item xs={8}>
          <center>
            <h1>
              wyr makes sure that every review is authentic and not modified in
              any way.
            </h1>
          </center>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        spacing={0}
        style={{
          marginTop: "10px",
          minHeight: "500px",
        }}
      >
        {isMobileOnly ? (
          <img
            src={process.env.PUBLIC_URL + "/images/review_feature.PNG"}
            width="98%"
            max-height="98%"
            object-fit="contain"
            alt=""
          />
        ) : (
          <Grid item xs={5}>
            <img
              data-aos="slide-right"
              src={process.env.PUBLIC_URL + "/images/review_feature.PNG"}
              width="98%"
              max-height="98%"
              object-fit="contain"
              alt=""
            />
          </Grid>
        )}
        {isMobileOnly ? (
          <center>
            <h1 style={{ marginLeft: "10px" }}>
              Write reviews based on experience to help other students choose
              their courses.
            </h1>
          </center>
        ) : (
          <Grid item xs={6}>
            <center>
              <h1 style={{ marginLeft: "10px" }}>
                Write reviews based on experience to help other students choose
                their courses.
              </h1>
            </center>
          </Grid>
        )}
      </Grid>

      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        spacing={0}
        style={{
          marginTop: "10px",
          minHeight: "500px",
        }}
      >
        {isMobileOnly && (
          <img
            src={process.env.PUBLIC_URL + "/images/class_feature.PNG"}
            width="98%"
            max-height="98%"
            object-fit="contain"
            alt=""
          />
        )}
        {isMobileOnly ? (
          <center>
            <h1>
              Get simple overviews for courses with all the info you need,
              without even signing up
            </h1>
          </center>
        ) : (
          <Grid item xs={4}>
            <center>
              <h1>
                Get simple overviews for courses with all the info you need,
                without even signing up
              </h1>
            </center>
          </Grid>
        )}

        {!isMobileOnly && (
          <Grid item xs={6}>
            <img
              data-aos="slide-left"
              src={process.env.PUBLIC_URL + "/images/class_feature.PNG"}
              width="98%"
              max-height="98%"
              object-fit="contain"
              style={{
                marginLeft: "10%",
              }}
              alt=""
            />
          </Grid>
        )}
      </Grid>

      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        spacing={0}
        style={{
          marginTop: "10px",
          minHeight: "500px",
        }}
      >
        {isMobileOnly ? (
          <img
            src={process.env.PUBLIC_URL + "/images/search_feature.PNG"}
            width="98%"
            max-height="98%"
            object-fit="contain"
            alt=""
          />
        ) : (
          <Grid item xs={5}>
            <img
              data-aos="slide-right"
              src={process.env.PUBLIC_URL + "/images/search_feature.PNG"}
              width="98%"
              max-height="98%"
              object-fit="contain"
              alt=""
            />
          </Grid>
        )}
        {isMobileOnly ? (
          <center>
            <h1 style={{ marginLeft: "10px" }}>
              Search for topics of interests to find the perfect courses for
              you.
            </h1>
          </center>
        ) : (
          <Grid item xs={6}>
            <center>
              <h1 style={{ marginLeft: "10px" }}>
                Search for topics of interests to find the perfect courses for
                you.
              </h1>
              <h1>
                Want to write a review for a course that doesn't appear in the
                list? No problem.
              </h1>
            </center>
          </Grid>
        )}
      </Grid>

      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={0}
        style={{
          marginTop: "10px",
          minHeight: "500px",
        }}
      >
        <Button
          variant="contained"
          style={{
            borderRadius: 25,
            backgroundColor: "#69b4cf",
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
            marginTop: "50px",
            marginBottom: "50px",
            fontFamily: "Poppins",
          }}
          onClick={() => setDirectToCoursesPage(true)}
        >
          check out reviews
        </Button>
        <br />
        <br />
        <Grid item xs={6}>
          <center>
            <h1>
              New features and more data coming soon! We’re currently adding
              SIRS for specific professors - check out your professors on
              <a
                href="https://docs.google.com/spreadsheets/d/1NT5k5e4twy-S8Af1J6XHb7024OgSaXm7u4WH7IB1jvw/edit#gid=140412152"
                target="blank"
                style={{
                  marginLeft: "1vw",
                  marginRight: "1vw",
                  textDecoration: "none",
                  color: "#69b4cf",
                }}
              >
                this
              </a>
              database for now!
            </h1>
          </center>
        </Grid>
        <br />
        <br />
        <br />
        <center>
          <h2>
            Have questions or feedback? Contact us at: wyrhelpdesk@gmail.com{" "}
          </h2>
        </center>
      </Grid>
    </div>
  );
};

export default LandingPage;
