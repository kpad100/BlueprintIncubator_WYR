import { Button, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { myFirebase } from "../firebase/firebase";
import { logoutUser } from "../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { isMobileOnly } from "react-device-detect";

const NavBar = ({
  isLoggingOut,
  logoutError,
  dispatch,
  backgroundColor,
  fromLandingPage,
  title,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [signupPopup, setSignupPopup] = useState(false);
  const [backToLanding, setBackToLanding] = useState(false);
  const [hover, setHover] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setTimeout(function () {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    const unsubscribe = myFirebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedIn(true);
      }
    });

    return () => {
      unsubscribe();
    };
  });

  if (backToLanding && !fromLandingPage) return <Redirect to="/" />;

  return (
    <Grid container style={{ backgroundColor: backgroundColor }}>
      <div>
        <img
          src="https://cdn.discordapp.com/attachments/812822571094900746/837106499863969812/wyr_transparent.png"
          height={fromLandingPage ? "80" : "50"}
          id="wyr_logo"
          style={{
            marginLeft: "5px",
            marginTop: "5px",
            marginBottom: "5px",
          }}
          alt=""
          onClick={() => setBackToLanding(true)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
        {hover && !fromLandingPage && (
          <label htmlFor="wyr_logo">back to home page</label>
        )}
      </div>
      {title && (
        <div style={{ marginLeft: "auto" }}>
          <h1
            style={
              isMobileOnly
                ? {
                    marginTop: "5px",
                    marginBottom: "0px",
                  }
                : {
                    marginTop: "5px",
                    marginBottom: "0px",
                    marginLeft: isLoggedIn ? "16%" : "45%",
                  }
            }
          >
            {title}
          </h1>
        </div>
      )}
      {isLoggedIn && (
        <Button
          variant="contained"
          disableElevation
          style={{
            borderRadius: 25,
            marginLeft: "auto",
            marginTop: "auto",
            marginBottom: "auto",
            marginRight: "1vw",
            maxHeight: "30px",
          }}
          onClick={handleLogout}
        >
          Log out
        </Button>
      )}

      {!isLoggedIn && (
        <div
          style={{
            marginLeft: "auto",
            marginTop: "auto",
            marginBottom: "auto",
            marginRight: "1vw",
          }}
        >
          <Button
            disableElevation
            size="large"
            style={{ borderRadius: 25, color: "white" }}
            onClick={() => setLoginPopup(true)}
          >
            Login
          </Button>
          <LoginPage
            trigger={loginPopup}
            closed={() => {
              setLoginPopup(false);
            }}
          />
          <Button
            variant="contained"
            disableElevation
            style={{ borderRadius: 25, marginLeft: "10px", maxHeight: "30px" }}
            onClick={() => setSignupPopup(true)}
          >
            Sign Up
          </Button>
          <SignupPage
            trigger={signupPopup}
            closed={() => {
              setSignupPopup(false);
            }}
          />
        </div>
      )}

      {isLoggingOut && <p>Logging Out....</p>}
      {logoutError && <p>Error logging out</p>}
    </Grid>
  );
};

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}

export default connect(mapStateToProps)(NavBar);
