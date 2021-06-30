import { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { loginUser } from "../actions";
import {
  Grid,
  TextField,
  Button,
  FormHelperText,
  FormControl,
  Card,
} from "@material-ui/core";

class Login extends Component {
  state = { email: "", password: "" };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(loginUser(email, password));
  };

  render() {
    const { loginError, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/dashboard" />;
    } else {
      return (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          backgroundColor="teal"
          style={{ minHeight: "100vh", backgroundColor: "teal" }}
        >
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
              <form onSubmit={this.handleSubmit}>
                <FormControl style={{ minWidth: "25vw", padding: "15px" }}>
                  <TextField
                    required
                    variant="outlined"
                    style={{ marginBottom: "7px", backgroundColor: "#D6EAF8 " }}
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={this.handleEmailChange}
                  />
                  <TextField
                    required
                    type="password"
                    label="Password"
                    name="password"
                    id="password"
                    variant="outlined"
                    style={{ marginBottom: "7px", backgroundColor: "#D6EAF8 " }}
                    onChange={this.handlePasswordChange}
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
                    style={{ backgroundColor: "orange" }}
                  >
                    Sign In
                  </Button>
                </FormControl>
              </form>
              <Link to="/forgotpassword">Forgot password?</Link>
              <footer style={{ marginTop: "7px", marginBottom: "15px" }}>
                Not a member? <Link to="/signup">Sign up</Link>
              </footer>
            </Grid>
          </Card>
        </Grid>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Login);
