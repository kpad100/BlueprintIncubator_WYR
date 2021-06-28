import { useState } from "react";
import { Grid, TextField, Button, FormControl } from "@material-ui/core";
import { passwordReset } from "../actions";

const ForgotpassPage = (props) => {
  const [email, setEmail] = useState("");
  let emailMatch = false;
  let buttonDisabled = false;

  if (setEmail === email && email.length > 0) emailMatch = true;

  const onSubmit = (e) => {
    e.preventDefault();
    passwordReset(email);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh", backgroundColor: "teal" }}
    >
      <div style={{ backgroundColor: "white", borderRadius: "5px" }}>
        <h1 style={{ textAlign: "center" }}>Forgot Password</h1>
        <form onSubmit={onSubmit}>
          {!emailMatch && (
            <h4
              style={{ color: "black", marginBottom: "7px", marginLeft: "7px" }}
            >
              Enter your email
            </h4>
          )}
          <FormControl
            style={{ minWidth: "25vw", padding: "25px", borderRadius: "25px" }}
          >
            <TextField
              required
              label="Email"
              id="email_field"
              variant="outlined"
              style={{ marginBottom: "7px", backgroundColor: "#D6EAF8 " }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              id="#btn-forgotPass"
              variant="contained"
              type="submit"
              style={{ marginBottom: "7px", backgroundColor: "orange" }}
              disabled={buttonDisabled}
            >
              Send email
            </Button>
          </FormControl>
        </form>
      </div>
    </Grid>
  );
};

export default ForgotpassPage;
