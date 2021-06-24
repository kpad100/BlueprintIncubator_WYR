import { Route, Switch } from "react-router-dom";
import StartPage from "./components/StartPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ForgotpassPage from "./components/ForgotpassPage";
import Dashboard from "./components/Dashboard";
import { connect } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import ReviewPage from "./components/ReviewPage";

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <ProtectedRoute
        exact
        path='/dashboard'
        component={Dashboard}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/reviewpage'
        component={ReviewPage}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />

      <Route exact path='/' render={() => <>{<StartPage />}</>} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/signup' component={SignupPage} />
      <Route exact path='/forgotpassword' component={ForgotpassPage} />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  };
}

export default connect(mapStateToProps)(App);
