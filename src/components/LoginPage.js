import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../actions";
import {
  Grid,
  TextField,
  Button,
  FormHelperText,
  FormControl,
  Card,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SignupPage from "./SignupPage";

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
}));

const Login = ({ dispatch, loginError, trigger }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [goToSignup, setGoToSignup] = useState(false);

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  if (goToSignup) {
    return <SignupPage trigger={trigger} />;
  } else {
    return (
      trigger && (
        <div className={classes.background}>
          <Card>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <img
                src="https://cdn.discordapp.com/attachments/812822571094900746/837106499863969812/wyr_transparent.png"
                height="80"
                alt=""
                style={{ marginTop: "15px" }}
              />
              <h1>Log In</h1>
              <form onSubmit={handleSubmit}>
                <FormControl style={{ minWidth: "25vw", padding: "15px" }}>
                  <TextField
                    required
                    variant="outlined"
                    style={{ marginBottom: "7px", backgroundColor: "#D6EAF8 " }}
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleEmailChange}
                  />
                  <TextField
                    required
                    type="password"
                    label="Password"
                    name="password"
                    id="password"
                    variant="outlined"
                    style={{ marginBottom: "7px", backgroundColor: "#D6EAF8 " }}
                    onChange={handlePasswordChange}
                  />
                  {loginError && (
                    <FormHelperText
                      style={{
                        color: "red",
                        marginBottom: "7px",
                        alignSelf: "center",
                      }}
                    >
                      Incorrect email or password.
                    </FormHelperText>
                  )}
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ backgroundColor: "#fb9263" }}
                  >
                    Sign In
                  </Button>
                </FormControl>
              </form>
              <Link to="/forgotpassword">Forgot password?</Link>
              <div style={{ marginTop: "10px", marginBottom: "15px" }}>
                Not a member?{" "}
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 25,
                    maxHeight: "25px",
                    backgroundColor: "#fb9263",
                  }}
                  onClick={() => {
                    setGoToSignup(true);
                  }}
                >
                  Sign up
                </Button>
              </div>
            </Grid>
          </Card>
        </div>
      )
    );
  }
};
//};

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Login);
