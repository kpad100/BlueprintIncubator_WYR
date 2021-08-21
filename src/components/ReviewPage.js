import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { ArrowBackIos, ExpandMore } from "@material-ui/icons";
import Dashboard from "./Dashboard";
import { db } from "../firebase/firebase";
import { isMobileOnly } from "react-device-detect";
import {
  IconButton,
  Grid,
  Typography,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@material-ui/core";
import AddReview from "./AddReview";
import Stars from "./Stars";

const useStyles = makeStyles((theme) => ({
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
}));

const ReviewPage = (props) => {
  const classes = useStyles();
  const [returnToDashboard, setReturnToDashboard] = useState(false); // when true, returns Dashboard component
  const [reviewList, setReviewList] = useState([]); // list of reviews
  const [avgRating, setAvgRating] = useState(0); // avgRating of all reviews for course
  const [buttonPopup, setButtonPopup] = useState(false);
  const { selectedCourse } = props;

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
    db.collection("courses/" + selectedCourse.code + "/reviews").onSnapshot(
      (querySnapshot) => {
        const reviews = [];
        let sum = 0;
        querySnapshot.forEach((doc) => {
          reviews.push(doc.data());
          sum += doc.data().overallRating;
        });
        setReviewList(reviews);
        setAvgRating(sum / reviews.length);
      }
    );
  }, [selectedCourse]);

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
              <Stars rating={avgRating} user={"average"} />
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
          <AddReview
            trigger={buttonPopup}
            closed={closePopUp}
            fromCourse={selectedCourse}
          />
        </div>

        <Grid container justify="center" alignItems="center">
          <Grid item xs={8}>
            <h1>Reviews</h1>
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
                <Typography
                  key={"prof" + review.user}
                  style={{ color: "white", marginRight: "auto" }}
                >
                  Professor: {review.prof}
                </Typography>

                {
                  // if NOT on mobile, shows overallRating (stars) for review in accordianSummary
                  !isMobileOnly && (
                    <Stars rating={review.overallRating} user={review.user} />
                  )
                }
                {
                  // if NOT on mobile, shows overallRating (number) for review in accordianSummary
                  !isMobileOnly &&
                    (Math.round(review.overallRating * 100) / 100).toFixed(2)
                }
                {!isMobileOnly && " overall"}

                {
                  // if NOT on mobile, shows grade received for review in accordianSummary
                  !isMobileOnly && (
                    <Typography
                      key={"grade" + review.user}
                      style={{ marginLeft: "auto" }}
                    >
                      Grade Received: {review.grade}
                    </Typography>
                  )
                }

                <Typography
                  key={review.user}
                  style={{ color: "white", marginLeft: "auto" }}
                >
                  {review.user}
                </Typography>
              </AccordionSummary>

              <AccordionDetails key={"accordionDetails" + review.user}>
                <Grid container direction={isMobileOnly ? "column" : "row"}>
                  {
                    // if ON mobile, shows grade received for review in accordianDetails
                    isMobileOnly && (
                      <Typography
                        key={"grade" + review.user}
                        style={{ marginBottom: "10px" }}
                      >
                        Grade Received: {review.grade}
                      </Typography>
                    )
                  }
                  <div id="ratings">
                    <div>
                      <Typography key={review.user + "workload"}>
                        Workload:
                      </Typography>
                      <Stars
                        rating={review.workloadRating}
                        user={review.user}
                      />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <Typography key={review.user + "diff"}>
                        Difficulty Of Content:
                      </Typography>
                      <Stars rating={review.diffRating} user={review.user} />
                    </div>
                    <div
                      style={
                        isMobileOnly
                          ? { marginTop: "10px", marginBottom: "10px" }
                          : { marginTop: "10px" }
                      }
                    >
                      <Typography key={"teach" + review.user}>
                        Teaching:
                      </Typography>
                      <Stars rating={review.teachRating} user={review.user} />
                    </div>
                  </div>

                  <Typography
                    key={"description" + review.user}
                    style={{ marginLeft: "auto" }}
                  >
                    {review.description}
                  </Typography>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </div>
    );
  }
};

export default ReviewPage;
