import { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  FormHelperText,
  FormControl,
  Card,
} from "@material-ui/core";
import { signupWithEmailPassword } from "../actions/auth";
import { db, myFirebase } from "../firebase/firebase";
import { makeStyles } from "@material-ui/styles";

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

const SignupPage = (props) => {
  const classes = useStyles();

  //const email_postfix1 = '@scarletmail.rutgers.edu';
  const email_postfix2 = "@rutgers.edu";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [majorList, setMajorList] = useState([""]);
  // const [minorList, setMinorList] = useState([""]);

  const [emailcheck, setEmailcheck] = useState(false);
  const [password_length_check, setPasswordLengthCheck] = useState(false);
  const [passMatch, setPassMatch] = useState(false);
  const [upperlower, setUpperLowerCheck] = useState(false);
  const [emailfakecheck, setEmailfakeCheck] = useState(true);
  const [passwordStrength, setPasswordstrengthCheck] = useState(true);
  // const [majorCheck, setMajorCheck] = useState(true);

  useEffect(() => {
    //validate email address: must be rutgers email
    let email_postfix = email.substring(email.indexOf("@"), email.length);
    if (email.length > 0 && email_postfix === email_postfix2) {
      setEmailcheck(true);
    }

    // validate password:
    // must be at least seven digits and include at least one uppercase and one lowercase character
    if (password.length > 0 && password.length > 6) {
      setPasswordLengthCheck(true);
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
      }
    }

    // check passwords match
    if (password.localeCompare(confirmPassword) === 0) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  }, [email, password, confirmPassword]);

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

    //console.log(majorList[0]);
    // if (majorList[0] !== "") {
    //   setMajorCheck(true);
    //   pass = pass && true;
    // } else {
    //   setMajorCheck(false);
    //   pass = pass && false;
    // }
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
        //console.log("arrive");
        addUser();
        //props.history.push("/dashboard");
      }
    } else {
      return renderForm();
    }
  }

  // function cleanList(list) {
  //   let majors = list;
  //   for (var i = 0; i < majors.length; i++) {
  //     if (majors[i] === "") {
  //       majors.splice(i, 1);
  //     }
  //   }
  //   return majors;
  // }

  function addUser() {
    // gets current user
    myFirebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // updates display name in Firebase user profile (can be accessed same way as user's uid)
        user
          .updateProfile({
            displayName: username,
          })
          .catch((error) => {
            console.log("Error updating profile: " + error);
          });

        // adds additional user info to Firestore "users" collection (info that's not a property of Firebase user profile)
        // let majors = cleanList(majorList);
        // let minors = cleanList(minorList);
        db.collection("users")
          .doc(user.uid)
          .set({
            firstName: firstName,
            lastName: lastName,
            // major: majors,
            // minor: minors,
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      }
    });
  }

  // const handleInputChangeMajor = (e, index) => {
  //   const name = e.target.value;
  //   const list = [...majorList];
  //   list[index] = name;
  //   setMajorList(list);
  // };
  // const handleRemoveClickMajor = (index) => {
  //   const list = [...majorList];
  //   list.splice(index, 1);
  //   setMajorList(list);
  // };

  // const handleAddClickMajor = () => {
  //   setMajorList([...majorList, ""]);
  // };

  // const handleInputChangeMinor = (e, index) => {
  //   const name = e.target.value;
  //   const list = [...minorList];
  //   list[index] = name;
  //   setMinorList(list);
  // };
  // const handleRemoveClickMinor = (index) => {
  //   const list = [...minorList];
  //   list.splice(index, 1);
  //   setMinorList(list);
  // };

  // const handleAddClickMinor = () => {
  //   setMinorList([...minorList, ""]);
  // };

  function renderForm() {
    return (
      <div className={classes.background}>
        <Card>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <h1 style={{ marginBottom: "0px" }}>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <FormControl style={{ minWidth: "25vw", padding: "15px" }}>
                {!emailcheck && (
                  <FormHelperText
                    style={{
                      color: "red",

                      alignSelf: "center",
                    }}
                  >
                    * Please use your rutgers email ending with @rutgers.edu
                  </FormHelperText>
                )}
                {!password_length_check && (
                  <FormHelperText
                    style={{
                      color: "red",

                      alignSelf: "center",
                    }}
                  >
                    * Password must be longer than six digits
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
                    * Password must include at least one uppercase and one lower
                    case letter
                  </FormHelperText>
                )}

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
                {/* {majorList.map((x, i) => {
                  return (
                    <div key={"majorListDiv" + i}>
                      <TextField
                        label="Major"
                        variant="outlined"
                        style={{
                          marginBottom: "7px",
                          backgroundColor: "#D6EAF8 ",
                        }}
                        value={x}
                        onChange={(e) => handleInputChangeMajor(e, i)}
                      />
                      {majorList.length !== 1 && (
                        <Button
                          //className="mr10"
                          variant="contained"
                          disableElevation
                          style={{ marginLeft: "10px", marginTop: "10px" }}
                          onClick={() => handleRemoveClickMajor(i)}
                        >
                          Remove
                        </Button>
                      )}
                      {majorList.length - 1 === i && (
                        <Button
                          variant="contained"
                          disableElevation
                          style={{ marginLeft: "10px", marginTop: "10px" }}
                          onClick={handleAddClickMajor}
                        >
                          Add
                        </Button>
                      )}
                      {!majorCheck && i === 0 && (
                        <FormHelperText
                          style={{
                            color: "red",
                            marginBottom: "7px",
                            alignSelf: "center",
                          }}
                        >
                          Enter at least one major
                        </FormHelperText>
                      )}
                    </div>
                  );
                })}
                {minorList.map((x, i) => {
                  return (
                    <div key={"minorListDiv" + i}>
                      <TextField
                        label="Minor (if applicable)"
                        variant="outlined"
                        style={{
                          marginBottom: "7px",
                          backgroundColor: "#D6EAF8 ",
                        }}
                        value={x}
                        onChange={(e) => handleInputChangeMinor(e, i)}
                      />
                      {minorList.length !== 1 && (
                        <Button
                          //className="mr10"
                          variant="contained"
                          disableElevation
                          style={{ marginLeft: "10px", marginTop: "10px" }}
                          onClick={() => handleRemoveClickMinor(i)}
                        >
                          Remove
                        </Button>
                      )}
                      {minorList.length - 1 === i && (
                        <Button
                          variant="contained"
                          disableElevation
                          style={{ marginLeft: "10px", marginTop: "10px" }}
                          onClick={handleAddClickMinor}
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  );
                })} */}
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
                  style={{ backgroundColor: "#fb9263" }}
                  type="submit"
                >
                  Create
                </Button>
              </FormControl>
            </form>
          </Grid>
        </Card>
      </div>
    );
  }

  if (props.trigger) {
    return renderForm();
  } else {
    return "";
  }
};

export default SignupPage;
