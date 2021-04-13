import { Avatar, Card, Grid, IconButton, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";

class Dashboard extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  render() {
    const { isLoggingOut, logoutError } = this.props;
    return (
      <div>
        <IconButton>
          <Avatar style={{ float: 'right' }} />
        </IconButton>
        <button onClick={this.handleLogout}>Logout</button>

        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={0}
          style={{ minHeight: '100vh' }}
        >

          <h1>Classes</h1>
          <Card style={{marginBottom: '15px'}}>
            <TextField 
              style={{minWidth: '50vw'}} 
            />
            <SearchIcon style={{marginTop: '4px'}} />
          </Card>

          <Card style={{backgroundColor: '#D3D3D3', marginBottom: '15px', marginRight: '5px', marginLeft: '5px', padding:'15px'}}>
            <Grid
              container
              alignItems="center"
              justify="center"
            >
              <h2>Class 1</h2>
              <StarIcon style={{ marginLeft: '100px' }}/>
              <StarIcon/>
              <StarIcon/>
              <StarOutlineIcon />
              <StarOutlineIcon />
              <p style={{ marginLeft:'10px' }}>(191 reviews)</p>
            </Grid>
          </Card>

          <Card style={{backgroundColor: '#D3D3D3', marginBottom: '15px', marginRight: '5px', marginLeft: '5px', padding:'15px'}}>
            <Grid
              container
              alignItems="center"
              justify="center"
            >
              <h2>Class 2</h2>
              <StarIcon style={{ marginLeft: '100px' }}/>
              <StarIcon/>
              <StarIcon/>
              <StarHalfIcon />
              <StarOutlineIcon />
              <p style={{ marginLeft:'10px' }}>(211 reviews)</p>
            </Grid>
          </Card>

          
          {isLoggingOut && <p>Logging Out....</p>}
          {logoutError && <p>Error logging out</p>}
        
        </Grid>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}

export default connect(mapStateToProps)(Dashboard);