import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import { ArrowBackIos, ExpandMore } from "@material-ui/icons";
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
import Button from "@material-ui/core/Button";
import AddReview from "./AddReview";
import RatingStars from "./RatingStars";

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
  addReviewButton: {
    width: isMobileOnly ? "80vw" : "40vw",
    height: "2rem",
    borderRadius: 25,
    backgroundColor: "#bdf4ff",
    marginTop: "25px",
  },
});

const ReviewPage = (props) => {
  const [returnToDashboard, setReturnToDashboard] = useState(false); // when true, returns Dashboard component
  const [reviewList, setReviewList] = useState([]); // list of reviews
  const [avgRating, setAvgRating] = useState(0); // avgRating of all reviews for course
  const [buttonPopup, setButtonPopup] = useState(false);
  const { selectedCourse, selectedCourseID, classes } = props;

  const popUpAddReview = () => {
    setButtonPopup(true);
  };

  const closePopUp = () => {
    setButtonPopup(false);
  };

  // handles when back button is clicked
  const handleReturnToDashboard = () => {
    setReturnToDashboard(true);
  };

  useEffect(() => {
    // receives review data from Firebase and updates reviewList and avgRating in state
    db.collection("courses/" + selectedCourseID + "/reviews").onSnapshot(
      (querySnapshot) => {
        const reviews = [];
        let sum = 0;
        querySnapshot.forEach((doc) => {
          reviews.push(doc.data());
          sum += doc.data().rating;
        });
        setReviewList(reviews);
        setAvgRating(sum / reviews.length);
      }
    );
  }, [selectedCourseID]);

  if (returnToDashboard) {
    return <Dashboard />;
  } else {
    return (
      <div>
        <Grid container>
          <IconButton onClick={handleReturnToDashboard}>
            <ArrowBackIos />
          </IconButton>
          <img
            src="https://cdn.discordapp.com/attachments/812822571094900746/837106499863969812/wyr_transparent.png"
            height="50"
            style={{
              marginLeft: "auto",
              marginRight: "5px",
              marginTop: "5px",
            }}
            alt=""
          />
        </Grid>

        <Card className={classes.summaryCard}>
          <Grid container alignItems="center">
            <div id="left">
              <h2>{selectedCourse.name}</h2>
              <h3>{selectedCourse.code}</h3>
            </div>

            <div
              id="middle"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "auto",
              }}
            >
              <RatingStars rating={avgRating} user={"average"} />
              <h3>{reviewList.length} reviews</h3>
            </div>

            <div id="right" style={{ marginLeft: "auto" }}>
              <h1>{(Math.round(avgRating * 100) / 100).toFixed(2)} / 5</h1>
              <h3>Overall Rating</h3>
            </div>
          </Grid>
        </Card>

        <div align="center">
          <Button
            variant="contained"
            disableElevation
            className={classes.addReviewButton}
            onClick={popUpAddReview}
          >
            Write a Review
          </Button>
          <AddReview trigger={buttonPopup} closed={closePopUp} />
        </div>

        <Grid container justify="center" alignItems="center">
          <Grid item xs={6}>
            <h1>Reviews</h1>
          </Grid>
          <Grid item xs={2}>
            <h2>Sort By</h2>
          </Grid>
          {reviewList.map((review) => (
            <Accordion
              key={"accordian" + review.user}
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
                key={"accordianSummary" + review.user}
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography key={review.user} style={{ color: "white" }}>
                  {review.user}
                </Typography>
                <div style={{ marginLeft: "auto" }}>
                  <RatingStars rating={review.rating} user={review.user} />
                </div>
                {
                  // if NOT on mobile, professor displayed in accordion summary
                  !isMobileOnly && (
                    <Typography
                      key={"prof" + review.user}
                      style={{ color: "white", marginLeft: "auto" }}
                    >
                      Professor: {review.prof}
                    </Typography>
                  )
                }
              </AccordionSummary>

              <AccordionDetails key={"accordionDetails" + review.user}>
                <Typography key={"description" + review.user} align="left">
                  {review.description}
                </Typography>
                {
                  // if on mobile, professor displayed in accordion details to right of description
                  isMobileOnly && (
                    <Typography
                      key={"prof" + review.user}
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
};

export default withStyles(styles)(ReviewPage);
