import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import StartPage from './components/StartPage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import ForgotpassPage from './components/ForgotpassPage';
import WelcomePage from './components/WelcomePage';
import ReviewPage from './components/ReviewPage';
import { Grid } from '@material-ui/core';

function App() {

  return (
    <Router>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Route path='/' exact render={() => (
          <>
            {<StartPage />}
          </>
        )}/>
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/forgotpassword' component={ForgotpassPage} />
        <Route path='/welcome' component={WelcomePage} />
        <Route path='/reviewpage' component={ReviewPage} />
      </Grid>
    </Router>
  );
}

export default App;
