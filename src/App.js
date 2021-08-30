import { Route, Switch } from "react-router-dom";
import ForgotpassPage from "./components/ForgotpassPage";
import CoursesPage from "./components/CoursesPage";
import { connect } from "react-redux";
import LandingPage from "./components/LandingPage";

function App(props) {
  const { isAuthenticated, isVerifying } = props;

  return (
    <Switch>
      <Route exact path="/BlueprintIncubatorGeneral" component={LandingPage} />
      <Route
        exact
        path="/courses"
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
        component={CoursesPage}
      />
      <Route exact path="/forgotpassword" component={ForgotpassPage} />
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
