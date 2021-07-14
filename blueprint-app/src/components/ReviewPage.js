import { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import {
  Star,
  StarOutline,
  StarHalf,
  ArrowBackIos,
  ExpandMore,
} from "@material-ui/icons";
import Dashboard from "./Dashboard";
import { db } from "../firebase/firebase";
import { isMobileOnly } from "react-device-detect";
import {
  IconButton,
  Paper,
  Grid,
  Typography,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import AddReview from './AddReview';
import {useState} from 'react';


// const useStyles2 = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//     backgroundColor: "#4198b5",
//     height: "flex",
//   },
// }));

// CSS styling
const styles = () => ({
  summaryCard: {
    backgroundColor: "#fb9263",
    width: "65vw",
    padding: "25px",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 25,
  },
});
const defaultProps = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  style: { width: '30rem', height: '2rem', borderRadius: 25},
};

class ReviewPage extends Component {
  state = {
    mountDashboard: false, // when true, mounts Dashboard component
    reviewList: [], // list of reviews
    avgRating: 0, // avgRating of all reviews for course
    buttonPopup: false,
  };

popUpOn = () => {
  this.setState(state => ({
    buttonPopup: true,
  }))
}

closePopUp = () => {
  this.setState(state => ({
    buttonPopup: false, 
  }))
}
  // handles when back button is clicked
  handleReturnToDashboard = () => {
    this.setState({ mountDashboard: true });
  };

  // Called immediately after a component is mounted. Setting state here will trigger re-rendering.
  componentDidMount() {
    // receives review data from Firebase and updates reviewList and avgRating in state
    db.collection(
      "courses/" + this.props.selectedCourseID + "/reviews"
    ).onSnapshot((querySnapshot) => {
      const reviews = [];
      let sum = 0;
      querySnapshot.forEach((doc) => {
        reviews.push(doc.data());
        sum += doc.data().rating;
      });
      this.setState({ reviewList: reviews, avgRating: sum / reviews.length });
    });
  }

  render() {
    const { selectedCourse, classes } = this.props;
    if (this.state.mountDashboard) {
      return <Dashboard />;
    } else {
      return (
        <div>
          <Grid id="topGridRP" container>
            <IconButton onClick={this.handleReturnToDashboard}>
              <ArrowBackIos />
            </IconButton>
            <img
              src="https://cdn.discordapp.com/attachments/812822571094900746/837106499863969812/wyr_transparent.png"
              height="50"
              style={{ marginLeft: "auto" }}
              alt=""
            />
          </Grid>

          <Card className={classes.summaryCard}>
            <Grid id="summaryCardGrid" container alignItems="center">
              <div id="left">
                <h2>{selectedCourse.name}</h2>
                <h3>{selectedCourse.code}</h3>
              </div>

              <div
                id="center"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "auto",
                }}
              >
                <div id="stars">
                  {
                    // displays avgRating(rounded down to nearest whole number) filled stars
                    Array(Math.floor(this.state.avgRating)).fill(
                      <Star style={{ color: "white", marginRight: "5px" }} />
                    )
                  }
                  {
                    // displays half star if avgRating decimal >= 0.25
                    this.state.avgRating - Math.floor(this.state.avgRating) >=
                      0.25 && (
                      <StarHalf
                        style={{ color: "white", marginRight: "5px" }}
                      />
                    )
                  }
                  {
                    // displays outlined star if avgRating decimal < 0.25
                    this.state.avgRating - Math.floor(this.state.avgRating) >
                      0 &&
                      this.state.avgRating - Math.floor(this.state.avgRating) <
                        0.25 && <StarOutline style={{ marginRight: "5px" }} />
                  }
                  {
                    // displays 5 - (avgRating rounded up to nearest whole number) outlined stars
                    Array(5 - Math.ceil(this.state.avgRating)).fill(
                      <StarOutline style={{ marginRight: "5px" }} />
                    )
                  }
                </div>
                <h3>{this.state.reviewList.length} reviews</h3>
              </div>

              <div id="right" style={{ marginLeft: "auto" }}>
                <h1>{this.state.avgRating} / 5</h1>
                <h3>Overall Rating</h3>
              </div>
            </Grid>
          </Card>

          {/* Button and Popup for adding reviews */}
          <Grid container justify="center" style={{marginTop: '25px'}}>
                <Button variant="contained"   disableElevation {...defaultProps} onClick={this.popUpOn}>
                 Write a Review
                </Button>
          </Grid>

          <AddReview trigger={this.state.buttonPopup} setTrigger={this.state.buttonPopUp} closed={this.closePopUp}>

          </AddReview>
          

          {/* Reviews text and Sort by in Grids */}
          <Grid
          container
          direction="row"
          spacing={50}
          style={{ marginTop: '0px'}}
          justify="center"
          alignItems="flex-start"
         >
        <Grid item xs={2}>

        </Grid>
        <Grid item xs={1}>
            <h1>Reviews</h1>
        </Grid>
        <Grid item xs={6}>

        </Grid>
        <Grid item xs={2}>
            <h2> Sort By </h2>
        </Grid>
        <Grid item xs={1}>

        </Grid>

      </Grid>

          <Grid id="mainGridRP" container justify="center">
            {this.state.reviewList.map((review) => (
              <Accordion
                defaultExpanded
                style={{
                  backgroundColor: "#4198b5",
                  borderRadius: 25,
                  width: isMobileOnly ? "90vw" : "65vw",
                  marginBottom: "10px",
                  padding: "10px",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{ color: "white" }}>Username</Typography>
                  <div style={{ marginLeft: "auto" }}>
                    {
                      // displays rating(rounded down to nearest whole number) filled stars
                      Array(Math.floor(review.rating)).fill(
                        <Star style={{ color: "white", marginLeft: "5px" }} />
                      )
                    }
                    {
                      // displays half star if rating decimal >= 0.25
                      review.rating - Math.floor(review.rating) >= 0.25 && (
                        <StarHalf
                          style={{ color: "white", marginLeft: "5px" }}
                        />
                      )
                    }
                    {
                      // displays outlined star if rating decimal < 0.25
                      review.rating - Math.floor(review.rating) > 0 &&
                        review.rating - Math.floor(review.rating) < 0.25 && (
                          <StarOutline style={{ marginLeft: "5px" }} />
                        )
                    }
                    {
                      // displays 5 - (rating rounded up to nearest whole number) outlined stars
                      Array(5 - Math.ceil(review.rating)).fill(
                        <StarOutline style={{ marginLeft: "5px" }} />
                      )
                    }
                  </div>
                  {
                    // if NOT on mobile, professor displayed in accordion summary
                    !isMobileOnly && (
                      <Typography
                        style={{ color: "white", marginLeft: "auto" }}
                      >
                        Professor: {review.prof}
                      </Typography>
                    )
                  }
                </AccordionSummary>

                <AccordionDetails>
                  <Typography align="left">{review.description}</Typography>
                  {
                    // if on mobile, professor displayed in accordion details to right of description
                    isMobileOnly && (
                      <Typography
                        style={{ color: "white", marginLeft: "auto" }}
                      >
                        Professor: {review.prof}
                      </Typography>
                    )
                  }
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </div>
      );
    }
  }
}

export default withStyles(styles)(ReviewPage);
