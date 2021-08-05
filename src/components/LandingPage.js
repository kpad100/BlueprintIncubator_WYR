import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import Aos from "aos";
import "aos/dist/aos.css";
import Typewriter from "../actions/Typewriter.js";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(145deg, #5F9EA0 20%, #ff7f50 70%)",
    color: "white",
    height: "3000px",
    maxWidth: "100%",
    overflowX: "hidden",
  },
});

const LandingPage = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  const classes = useStyles();

  const [directToLogin, setDirectToLogin] = useState(false);
  const [directToSignup, setDirectToSignup] = useState(false);
  const handleLoginClick = () => {
    setDirectToLogin(true);
  };

  const handleSignupClick = () => {
    setDirectToSignup(true);
  };

  if (directToLogin === true) return <Redirect to="/login" />;

  if (directToSignup === true) return <Redirect to="/signup" />;

  return (
    // The top bar with logo and sign up and login
    <div className={classes.root}>
      <Grid container>
        <img
          src="https://cdn.discordapp.com/attachments/812822571094900746/837106499863969812/wyr_transparent.png"
          height="80"
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            marginTop: "10px",
          }}
          alt=""
        />
        <div
          style={{ marginLeft: "auto", marginRight: "10px", marginTop: "10px" }}
        >
          <Button
            disableElevation
            size="large"
            style={{ borderRadius: 25, color: "white" }}
            onClick={handleLoginClick}
          >
            Login
          </Button>
          <Button
            variant="contained"
            disableElevation
            style={{ borderRadius: 25, marginLeft: "10px", maxHeight: "30px" }}
            onClick={handleSignupClick}
          >
            Sign Up
          </Button>
        </div>
      </Grid>

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
          disableElevation
          style={{
            borderRadius: 25,
            backgroundColor: "#FF7F50",
            color: "white",
            fontSize: 17,
            fontWeight: "bold",
            marginTop: "50px",
            marginBottom: "50px",
          }}
          onClick={handleLoginClick}
        >
          add a review now
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
          </center>
        </Grid>
        <Button
          variant="contained"
          disableElevation
          style={{
            borderRadius: 25,
            backgroundColor: "white",
            color: "#FF7F50",
            fontSize: 17,
            fontWeight: "bold",
          }}
          onClick={handleSignupClick}
        >
          sign up now
        </Button>
      </Grid>
    </div>
  );
};

export default LandingPage;
