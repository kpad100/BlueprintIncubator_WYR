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

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(145deg, #5F9EA0 20%, #ff7f50 70%)",
    color: "white",
    height: "2875px",
    maxWidth: "100%",
    overflowX: "hidden",
  },
});

const LandingPage = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
    checkLoginStatus();
  }, []);

  const classes = useStyles();
  const [directToDashboard, setDirectToDashboard] = useState(false);
  const [signupPopup, setSignupPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function checkLoginStatus() {
    myFirebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedIn(true);
      }
    });
  }

  if (directToDashboard === true) return <Redirect to="/dashboard" />;

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
          <center style={{ fontSize: 40 }}>
            <Typewriter text={"Would You Recommend?"} />
          </center>
        </Grid>
        <Grid item xs={8}>
          <center>
            <h1>
              wyr is an informative and intuitive tool to help find, choose, and
              organize your classes.
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
          onClick={() => setDirectToDashboard(true)}
        >
          look at reviews
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
        <Grid item xs={6}>
          <center>
            <h1 style={{ marginLeft: "10px" }}>
              Search for topics of interests to find the perfect classes for you
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
        <Grid item xs={4}>
          <center>
            <h1>Get simple overviews for classes with all the info you need</h1>
          </center>
        </Grid>

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
        <Grid item xs={6}>
          <center>
            <h1 style={{ marginLeft: "10px" }}>
              Write reviews based on experience to help other students choose
              their classes.
            </h1>
          </center>
        </Grid>
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
        <Grid item xs={6}>
          <center>
            <h1>New things are coming soon, sign up to stay in the loop</h1>
            {!isLoggedIn && (
              <div>
                <Button
                  variant="contained"
                  disableElevation
                  style={{
                    borderRadius: 25,
                    marginLeft: "10px",
                    maxHeight: "30px",
                  }}
                  onClick={() => setSignupPopup(true)}
                >
                  Sign Up
                </Button>
                <SignupPage trigger={signupPopup} />
              </div>
            )}
          </center>
        </Grid>
        <br />
        <center>
          <h2>Contact us at: wyrhelpdesk@gmail.com </h2>
        </center>
      </Grid>
    </div>
  );
};

export default LandingPage;
