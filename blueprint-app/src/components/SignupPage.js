import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  FormHelperText,
  FormControl,
  Card,
} from "@material-ui/core";
import { signupWithEmailPassword } from "../actions/auth";

const SignupPage = (props) => {
  //const email_postfix1 = '@scarletmail.rutgers.edu';
  const email_postfix2 = "@rutgers.edu";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailcheck, setEmailcheck] = useState(true);
  const [password_length_check, setPasswordLengthCheck] = useState(true);
  const [passMatch, setPassMatch] = useState(true);
  const [upperlower, setUpperLowerCheck] = useState(true);
  const [emailfakecheck, setEmailfakeCheck] = useState(true);
  const [passwordStrength, setPasswordstrengthCheck] = useState(true);

  function validateForm() {
    var pass = true;

    //validate email address: must be rutgers email
    let email_postfix = email.substring(email.indexOf("@"), email.length);
    if (email.length > 0 && email_postfix === email_postfix2) {
      setEmailcheck(true);
      pass = pass && true;
    } else {
      setEmailcheck(false);
      pass = pass && false;
    }

    // validate password:
    // must be at least seven digits and include at least one uppercase and one lowercase character
    if (password.length > 0 && password.length <= 6) {
      setPasswordLengthCheck(false);
      pass = pass && false;
    } else {
      setPasswordLengthCheck(true);
      pass = pass && true;
      var i = 0;
      var temp1 = false;
      var temp2 = false;
      while (i <= password.length) {
        if (password.charAt(i) === "") {
          i++;
          continue;
        } else if (/^[a-z]*$/.test(password.charAt(i))) {
          temp2 = true;
        } else if (/^[A-Z]*$/.test(password.charAt(i))) {
          temp1 = true;
        }
        i++;
      }
      if (temp1 && temp2) {
        setUpperLowerCheck(true);
        pass = pass && true;
      } else {
        setUpperLowerCheck(false);
        pass = pass && false;
      }
    }

    //validate password match
    if (
      confirmPassword.length > 6 &&
      password.localeCompare(confirmPassword) === 0
    ) {
      setPassMatch(true);
      pass = pass && true;
    } else {
      setPassMatch(false);
      pass = pass && false;
    }
    return pass;
  }

  function handleSubmit(event) {
    event.preventDefault();

    var isValid = validateForm();
    if (isValid) {
      var errorCode = signupWithEmailPassword(email, password);
      if (errorCode === "auth/invalid-email") {
        setEmailfakeCheck(false);
        return renderForm();
      } else if (errorCode === "auth/weak-password") {
        setPasswordstrengthCheck(false);
        return renderForm();
      } else {
        props.history.push("/dashboard");
      }
    } else {
      return renderForm();
    }
  }

  function renderForm() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh", backgroundColor: "#E67E22 " }}
      >
        <Card>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <FormControl style={{ minWidth: "25vw", padding: "15px" }}>
                <TextField
                  required
                  label="First Name"
                  variant="outlined"
                  style={{ marginBottom: "7px", backgroundColor: "#D6EAF8 " }}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  required
                  label="Last Name"
                  variant="outlined"
                  style={{ marginBottom: "7px", backgroundColor: "#D6EAF8 " }}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  required
                  label="Email"
                  variant="outlined"
                  style={{ marginBottom: "7px", backgroundColor: "#D6EAF8 " }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!emailcheck && (
                  <FormHelperText
                    style={{
                      color: "red",
                      marginBottom: "7px",
                      alignSelf: "left",
                    }}
                  >
                    You have to use a rutgers email ending with @rutgers.edu
                  </FormHelperText>
                )}
                {!emailfakecheck && (
                  <FormHelperText
                    style={{
                      color: "red",
                      marginBottom: "7px",
                      alignSelf: "center",
                    }}
                  >
                    Email address is invalid
                  </FormHelperText>
                )}
                <TextField
                  required
                  label="Username"
                  variant="outlined"
                  style={{ marginBottom: "7px", backgroundColor: "#D6EAF8" }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  required
                  type="password"
                  label="Password"
                  variant="outlined"
                  style={{ marginBottom: "7px", backgroundColor: "#D6EAF8 " }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!password_length_check && (
                  <FormHelperText
                    style={{
                      color: "red",
                      marginBottom: "7px",
                      alignSelf: "center",
                    }}
                  >
                    please enter a password longer than six digits
                  </FormHelperText>
                )}
                {!upperlower && (
                  <FormHelperText
                    style={{
                      color: "red",
                      marginBottom: "7px",
                      alignSelf: "center",
                    }}
                  >
                    Include at least one uppercase and one lower case letter
                  </FormHelperText>
                )}
                {!passwordStrength && (
                  <FormHelperText
                    style={{
                      color: "red",
                      marginBottom: "7px",
                      alignSelf: "center",
                    }}
                  >
                    Try to use a stronger password
                  </FormHelperText>
                )}
                <TextField
                  required
                  type="password"
                  label="Re-enter Password"
                  variant="outlined"
                  style={{ marginBottom: "7px", backgroundColor: "#D6EAF8 " }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {!passMatch && (
                  <FormHelperText
                    style={{
                      color: "red",
                      marginBottom: "7px",
                      alignSelf: "center",
                    }}
                  >
                    Passwords Do Not Match
                  </FormHelperText>
                )}
                <Button
                  variant="contained"
                  style={{ backgroundColor: "orange" }}
                  type="submit"
                >
                  Create
                </Button>
              </FormControl>
            </form>
            <footer style={{ marginBottom: "15px" }}>
              Already a member? <Link to="/login">Log in</Link>
            </footer>
          </Grid>
        </Card>
      </Grid>
    );
  }

  return renderForm();
};

export default SignupPage;
