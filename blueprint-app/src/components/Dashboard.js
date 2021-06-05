import {
  Avatar,
  Card,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Search, Star, StarOutline, StarHalf } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";

const styles = () => ({
  classCard: {
    backgroundColor: "#D3D3D3",
    marginBottom: "15px",
    marginRight: "5px",
    marginLeft: "5px",
    padding: "15px",
  },
});

class Dashboard extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  state = {
    anchorEl: null,
    classList: [
      {
        name: "Class 1",
        avgRating: 3,
        numOfReviews: 191,
      },
      {
        name: "Class 2",
        avgRating: 3.5,
        numOfReviews: 211,
      },
    ],
  };

  handleOpenMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, isLoggingOut, logoutError } = this.props;
    return (
      <div>
        <header>
          <IconButton onClick={this.handleOpenMenu} aria-controls="menu">
            <Avatar />
          </IconButton>
          <Menu
            id="menu"
            onClose={this.handleCloseMenu}
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
          >
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </Menu>
        </header>

        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={0}
          style={{ minHeight: "100vh" }}
        >
          <h1>Classes</h1>
          <Card style={{ marginBottom: "15px" }}>
            <TextField style={{ minWidth: "50vw" }} />
            <Search style={{ marginTop: "4px" }} />
          </Card>

          {this.state.classList.map((Class) => (
            <Card className={classes.classCard}>
              <Grid container alignItems="center" justify="center">
                <h2 style={{ marginRight: "100px" }}>{Class.name}</h2>
                {Array(Math.floor(Class.avgRating)).fill(<Star />)}
                {Class.avgRating % 1 !== 0 && <StarHalf />}
                {Array(5 - Math.ceil(Class.avgRating)).fill(<StarOutline />)}
                <p style={{ marginLeft: "10px" }}>
                  ({Class.numOfReviews} reviews)
                </p>
              </Grid>
            </Card>
          ))}
        </Grid>

        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Dashboard));
