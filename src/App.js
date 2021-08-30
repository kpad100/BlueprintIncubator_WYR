import { Route, Switch } from "react-router-dom";
import ForgotpassPage from "./components/ForgotpassPage";
import CoursesPage from "./components/CoursesPage";
import { connect } from "react-redux";
import LandingPage from "./components/LandingPage";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  "@global": {
    //makes scrollbar look less intrusive
    "*::-webkit-scrollbar": {
      width: "0.7em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#D6EAF8 ",
      outline: "1px solid slategrey",
    },
  },
}));

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  useStyles();
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
