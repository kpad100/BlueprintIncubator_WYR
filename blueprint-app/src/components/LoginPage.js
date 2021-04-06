import { Component } from 'react'
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { loginUser } from "../actions";
import { Grid, TextField, Button, FormHelperText, FormControl } from '@material-ui/core'

class Login extends Component {
    state = { email: "", password: "" };

    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value });
    };

    handlePasswordChange = ({ target }) => {
        this.setState({ password: target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault()
        
        const { dispatch } = this.props;
        const { email, password } = this.state;

        dispatch(loginUser(email, password));
    };
   
    render() {
        const { classes, loginError, isAuthenticated } = this.props;
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
                style={{ minHeight: '100vh' }}
            >
                <img 
                    src='https://se-infra-imageserver2.azureedge.net/clink/images/12e150ea-c835-422a-a07b-8498f3af3d942c70b420-5a42-46c4-8de4-c249585563c9.png?preset=med-sq' 
                    height='80' 
                    alt=''
                />
                <h1>Log In</h1>
                {loginError && <FormHelperText style={{color: 'red', marginBottom:'12px', marginTop:'0px'}}>
                    Incorrect email or password.
                </FormHelperText>}
                <form onSubmit={this.handleSubmit}>
                    <FormControl>
                        <TextField 
                            required
                            variant='outlined' 
                            style={{marginBottom:'7px'}} 
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={this.handleEmailChange}
                        />
                        <TextField 
                            required 
                            type='password'
                            label='Password' 
                            name="password"
                            id="password"
                            variant='outlined' 
                            style={{marginBottom:'7px'}} 
                            onChange={this.handlePasswordChange}
                        />
                        <Button 
                            variant='contained' 
                            type='submit'
                            style={{marginBottom:'7px' }} 
                            color='primary' 
                        >
                            Sign In
                        </Button>
                    </FormControl>
                </form>
                <Link to='/forgotpassword'>Forgot password?</Link>
                <footer style={{marginTop:'7px'}}>
                    Not a member? <Link to='/signup'>Sign up</Link>
                </footer>
            </Grid>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
      isLoggingIn: state.auth.isLoggingIn,
      loginError: state.auth.loginError,
      isAuthenticated: state.auth.isAuthenticated
    };
}

export default (connect(mapStateToProps)(Login));