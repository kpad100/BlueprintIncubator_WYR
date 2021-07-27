import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid, Card, Paper } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(145deg, #5F9EA0 20%, #ff7f50 70%)",

    color: "white",
    height: "3300px",
    width: "100%",
  },
});

const LandingPage = () => {
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
    <Card className={classes.root} square="false">
      <Grid
        container
        spacing={3}
        style={{
          marginLeft: "10px",
          marginTop: "5px",
        }}
      >
        <Grid xs={2}>
          <img
            src="https://cdn.discordapp.com/attachments/812822571094900746/837106499863969812/wyr_transparent.png"
            height="80"
            style={{
              marginLeft: "7px",
              marginRight: "10px",
              marginTop: "7px",
            }}
            alt=""
          />
        </Grid>

        <Grid xs={7}></Grid>

        <Grid container justifyContent="center" alignItems="center" xs={1}>
          <Button
            disableElevation
            size="large"
            style={{ borderRadius: 25, color: "white" }}
            onClick={handleLoginClick}
          >
            Login
          </Button>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" xs={2}>
          <Button
            variant="contained"
            disableElevation
            style={{ borderRadius: 25 }}
            size="medium"
            onClick={handleSignupClick}
          >
            Sign Up
          </Button>
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
          minHeight: "600px",
        }}
      >
        <Grid item xs={12} style={{ fontSize: 100, fontWeight: "bold" }}>
          would you recommend?
        </Grid>
        <Grid item xs={8} style={{ fontSize: 45 }}>
          <center>
            <h5>
              wyr is an informative and intuitive tool to help find, choose, and
              organize your classes.
            </h5>
          </center>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            disableElevation
            style={{
              borderRadius: 25,
              backgroundColor: "#FF7F50",
              color: "white",
              fontSize: 17,
              fontWeight: "bold",
            }}
            size="medium"
            onClick={handleLoginClick}
          >
            add a class now
          </Button>
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
        <Grid item xs={12} style={{ fontSize: 75, fontWeight: "bold" }}>
          real students, real reviews
        </Grid>
        <Grid item xs={8} style={{ fontSize: 45 }}>
          <center>
            <h5>
              wyr makes sure that every review is authentic and not modified in
              any way.
            </h5>
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
          <Paper
            elevation={0}
            style={{ backgroundColor: "white", minHeight: "320px" }}
          ></Paper>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={6} style={{ fontSize: 45 }}>
          <center>
            <h5>
              search for topics of interests to find the perfect classes for you
            </h5>
          </center>
        </Grid>
        <Grid item xs={1}></Grid>
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
        <Grid item xs={1}></Grid>
        <Grid item xs={6} style={{ fontSize: 45 }}>
          <center>
            <h5>get simple overviews for classes with all the info you need</h5>
          </center>
        </Grid>
        <Grid item xs={1}></Grid>

        <Grid item xs={4}>
          <Paper
            elevation={0}
            style={{ backgroundColor: "white", minHeight: "320px" }}
          ></Paper>
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
          <Paper
            elevation={0}
            style={{ backgroundColor: "white", minHeight: "320px" }}
          ></Paper>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={6} style={{ fontSize: 45 }}>
          <center>
            <h5>
              write reviews based on experience to help other students choose
              their classes.
            </h5>
          </center>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>

      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={0}
        style={{
          marginTop: "10px",
          minHeight: "400px",
        }}
      >
        <Grid item xs={6} style={{ fontSize: 45 }}>
          <center>
            <h5>
              new things are always coming soon, sign up to stay in the loop
            </h5>
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
          size="medium"
          onClick={handleSignupClick}
        >
          sign up now
        </Button>
      </Grid>
    </Card>
  );
};

export default LandingPage;
