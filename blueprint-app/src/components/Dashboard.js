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
import { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";

class Dashboard extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  state = { anchorEl: null };

  handleOpenMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { isLoggingOut, logoutError } = this.props;
    return (
      <div>
        <header>
          <IconButton onClick={this.handleOpenMenu} aria-controls='menu'>
            <Avatar />
          </IconButton>
          <Menu
            id='menu'
            onClose={this.handleCloseMenu}
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
          >
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </Menu>
        </header>

        <Grid
          container
          direction='column'
          alignItems='center'
          spacing={0}
          style={{ minHeight: "100vh" }}
        >
          <h1>Classes</h1>
          <Card style={{ marginBottom: "15px" }}>
            <TextField style={{ minWidth: "50vw" }} />
            <Search style={{ marginTop: "4px" }} />
          </Card>

          <Card
            style={{
              backgroundColor: "#D3D3D3",
              marginBottom: "15px",
              marginRight: "5px",
              marginLeft: "5px",
              padding: "15px",
            }}
          >
            <Grid container alignItems='center' justify='center'>
              <h2>Class 1</h2>
              <Star style={{ marginLeft: "100px" }} />
              <Star />
              <Star />
              <StarOutline />
              <StarOutline />
              <p style={{ marginLeft: "10px" }}>(191 reviews)</p>
            </Grid>
          </Card>

          <Card
            style={{
              backgroundColor: "#D3D3D3",
              marginBottom: "15px",
              marginRight: "5px",
              marginLeft: "5px",
              padding: "15px",
            }}
          >
            <Grid container alignItems='center' justify='center'>
              <h2>Class 2</h2>
              <Star style={{ marginLeft: "100px" }} />
              <Star />
              <Star />
              <StarHalf />
              <StarOutline />
              <p style={{ marginLeft: "10px" }}>(211 reviews)</p>
            </Grid>
          </Card>
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

export default connect(mapStateToProps)(Dashboard);
