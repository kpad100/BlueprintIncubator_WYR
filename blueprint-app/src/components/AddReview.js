import React from 'react'
import Button from '@material-ui/core/Button';
import { SportsRugbySharp } from '@material-ui/icons';
import {Grid, Card} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

function AddReview(props) {

// CSS
    const background = {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100vh",
        backgroundColor: 'rgba(52, 52, 52, 0.4)',

        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        zIndex: 4,
    };
    const innerBlock = {
        position: "relative",
        padding: "32px",
        width: " 70%",
        maxWidth: "800px",
        backgroundColor: '#FFF',
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
    

    return (props.trigger ) ? (

        <div style={background}>
            <Card style={innerBlock}>
                <TextField  id="standard-multiline-static"
                    style={{width: '80%', marginBottom: "10px"}}
                    label="Enter Your Review"
                    multiline
                    rows={5}
                    
                    
                />
                <Grid> 
                   
                    <Button variant="contained" color="secondary" disableElevation style={{marginRight: "20px"}}> Submit </Button>
                        
                    <Button onClick={props.closed} variant="contained" color="secondary" disableElevation style={{marginLeft: "20px"}}>Close</Button>
                    
                </Grid>
                
            </Card>
            
        </div>
    ) : "";
}

export default AddReview
