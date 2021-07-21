import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Grid, Card } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(145deg, #008080 30%, #ff7f50 100%)', 

    color: 'white',
    height: '100vh',
    width: '100%',
  },
});



export default function Hook() {
  const classes = useStyles();
  return(
    <Card className={classes.root} square ="false">

       <Grid container 
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3} 
            style={{
            marginLeft: "10px",
            marginTop: "5px",
            }}>
           <Grid xs={2}>
                <img
                    src="https://cdn.discordapp.com/attachments/812822571094900746/837106499863969812/wyr_transparent.png"
                    height="80"
                    style={{
                    marginLeft: "7px",
                    marginRight: "10px",
                    marginTop: "7px",
                    }}
                    alt=""
                />
           </Grid>

           <Grid xs={7}>
           </Grid>

           <Grid xs={1}>
                <Button disableElevation size="large" style={{ color: 'white' }} > 
                    
                    Login 
                    
                </Button>
           </Grid>
           <Grid xs={2}>
                <Button variant="contained" 
                    disableElevation 
                    style={{borderRadius:25}}
                    size="medium"
                >
                    Sign In
                </Button>
           </Grid>

       </Grid>
    

         
    </Card>
  ) 
    
}