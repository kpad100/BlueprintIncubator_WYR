import { Route, Switch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import StartPage from './components/StartPage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import ForgotpassPage from './components/ForgotpassPage';
import WelcomePage from './components/WelcomePage';
import { Grid } from '@material-ui/core';
import { connect } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <ProtectedRoute exact path='/welcome' component={WelcomePage} isAuthenticated={isAuthenticated} isVerifying={isVerifying}/>
        <Route exact path='/' exact render={() => (
          <>
            {<StartPage />}
          </>
        )}/>
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/signup' component={SignupPage} />
        <Route exact path='/forgotpassword' component={ForgotpassPage} />
      </Grid>
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);
