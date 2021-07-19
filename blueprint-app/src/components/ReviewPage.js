import { useState, useEffect } from "react";
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
import Button from "@material-ui/core/Button";
import AddReview from "./AddReview";

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
    width: isMobileOnly ? "80vw" : "30rem",
    height: "2rem",
    borderRadius: 25,
    backgroundColor: "#bdf4ff",
    marginTop: "25px",
  },
});

const ReviewPage = (props) => {
  const [mountDashboard, setMountDashboard] = useState(false); // when true, mounts Dashboard component
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
    setMountDashboard(true);
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

  if (mountDashboard) {
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
              <div id="overallStars">
                {
                  // displays avgRating(rounded down to nearest whole number) filled stars
                  Array(Math.floor(avgRating)).fill(
                    <Star style={{ color: "white", marginRight: "5px" }} />
                  )
                }
                {
                  // displays half star if avgRating decimal >= 0.25
                  avgRating - Math.floor(avgRating) >= 0.25 && (
                    <StarHalf style={{ color: "white", marginRight: "5px" }} />
                  )
                }
                {
                  // displays outlined star if avgRating decimal < 0.25
                  avgRating - Math.floor(avgRating) > 0 &&
                    avgRating - Math.floor(avgRating) < 0.25 && (
                      <StarOutline style={{ marginRight: "5px" }} />
                    )
                }
                {
                  // displays 5 - (avgRating rounded up to nearest whole number) outlined stars
                  Array(5 - Math.ceil(avgRating)).fill(
                    <StarOutline style={{ marginRight: "5px" }} />
                  )
                }
              </div>
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

                <div key={"stars" + review.user} style={{ marginLeft: "auto" }}>
                  {
                    // displays rating(rounded down to nearest whole number) filled stars
                    Array(Math.floor(review.rating)).fill(
                      <Star style={{ color: "white", marginLeft: "5px" }} />
                    )
                  }
                  {
                    // displays half star if rating decimal >= 0.25
                    review.rating - Math.floor(review.rating) >= 0.25 && (
                      <StarHalf style={{ color: "white", marginLeft: "5px" }} />
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
