import Button from "@material-ui/core/Button";
import { SportsRugbySharp } from "@material-ui/icons";
import { Grid, Card } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Star, StarOutline, StarHalf } from "@material-ui/icons"; 


import {useState} from "react";

const AddReview = (props) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  // CSS
  const background = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(52, 52, 52, 0.4)",

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
    backgroundColor: "#FFF",
    zIndex: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    props.trigger && (
      <div style={background}>
        <Card style={innerBlock}>

          {/* Stars */}
          <div>
          {[...Array(5)].map((star,i ) => {
            const ratingValue = i + 1;

            return (
              <label >
                <input type="radio" name="rating" 
                style={{display:"none"}} 
                value={ratingValue} 
                onClick={() => setRating(ratingValue)} 
                />
                
                {/* Colors for Star  */}
                <Star 
                color={ratingValue <= (hover || rating) ? "primary" : "secondary"}
                style={{ fontSize: 34, cursor:"pointer"}} 
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={()=> setHover(null)}
                /> 
              </label>

            );
          })}

          </div>

          <TextField
            id="standard-multiline-static"
            style={{ width: "80%", marginBottom: "10px", marginTop: "5px" }}
            label="Professor:"
            multiline
            rows={2}
          />
          <TextField
            id="standard-multiline-static"
            style={{ width: "80%", marginBottom: "20px" }}
            label="Enter Your Review:"
            multiline
            rows={5}
          />
          <Grid>
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              style={{ marginRight: "20px" }}
            >
              Submit
            </Button>

            <Button
              onClick={props.closed}
              variant="contained"
              color="secondary"
              disableElevation
              style={{ marginLeft: "20px" }}
            >
              Close
            </Button>
          </Grid>
        </Card>
      </div>
    )
  );
};

export default AddReview;
