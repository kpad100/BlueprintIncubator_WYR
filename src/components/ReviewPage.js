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
  InputBase,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import AddReview from "./AddReview";
import Stars from "./Stars";

const useStyles = makeStyles((theme) => ({
  summaryCard: {
    backgroundColor: "#fb9263",
    width: isMobileOnly ? "90vw" : "65vw",
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

const ReviewPage = ({ selectedCourse }) => {
  const classes = useStyles();
  const [returnToDashboard, setReturnToDashboard] = useState(false); // when true, returns Dashboard component
  const [reviewList, setReviewList] = useState([]); // list of reviews
  const [selectedProf, setSelectedProf] = useState("All Professors");
  const [profList, setProfList] = useState([]);
  const [avgWorkload, setAvgWorkload] = useState(0);
  const [avgDiff, setAvgDiff] = useState(0);
  const [avgTeach, setAvgTeach] = useState(0);
  const [avgOverall, setAvgOverall] = useState(0); // avgRating of all reviews for course
  const [buttonPopup, setButtonPopup] = useState(false);

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
    db.collection("courses/")
      .doc(selectedCourse.code)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const profs = [];
          for (let i = 0; i < doc.data().profs.length; i++) {
            profs.push(doc.data().profs[i]);
          }
          setProfList(profs);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    // receives review data from Firebase and updates reviewList and avgRating in state
    db.collection("courses/" + selectedCourse.code + "/reviews").onSnapshot(
      (querySnapshot) => {
        const reviews = [];
        let workloadSum = 0;
        let diffSum = 0;
        let teachSum = 0;
        querySnapshot.forEach((doc) => {
          if (selectedProf === "All Professors") {
            reviews.push(doc.data());
            workloadSum += doc.data().workloadRating;
            diffSum += doc.data().diffRating;
            teachSum += doc.data().teachRating;
          } else if (doc.data().prof === selectedProf) {
            reviews.push(doc.data());
            workloadSum += doc.data().workloadRating;
            diffSum += doc.data().diffRating;
            teachSum += doc.data().teachRating;
          }
        });
        setReviewList(reviews);
        setAvgWorkload(workloadSum / reviews.length);
        setAvgDiff(diffSum / reviews.length);
        setAvgTeach(teachSum / reviews.length);
        setAvgOverall(
          (workloadSum / reviews.length +
            diffSum / reviews.length +
            teachSum / reviews.length) /
            3
        );
      }
    );
  }, [selectedCourse, selectedProf]);

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
              <Grid container>
                {isMobileOnly ? (
                  <h4>Showing averages for</h4>
                ) : (
                  <h3>Showing averages for</h3>
                )}

                <FormControl
                  style={{
                    backgroundColor: "#bdf4ff",
                    marginLeft: "10px",
                    marginTop: "10px",
                    height: 30,
                    padding: "5px",
                  }}
                >
                  <Select
                    value={selectedProf}
                    onChange={(e) => {
                      setSelectedProf(e.target.value);
                    }}
                    input={<InputBase />}
                  >
                    <MenuItem key={"All Profs key"} value={"All Professors"}>
                      All Professors
                    </MenuItem>
                    {profList.map((prof) => {
                      return (
                        <MenuItem key={prof + "key"} value={prof}>
                          {prof}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </div>

            <div
              id="middle"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "auto",
              }}
            >
              <Grid container>
                <h3>Workload:</h3>
                <div style={{ marginTop: "18px", marginLeft: "10px" }}>
                  <Stars rating={avgWorkload} user={"average"} />
                </div>
              </Grid>
              <Grid container>
                <h3>Difficulty:</h3>
                <div style={{ marginTop: "18px", marginLeft: "10px" }}>
                  <Stars rating={avgDiff} user={"average"} />
                </div>
              </Grid>
              <Grid container>
                <h3>Teaching:</h3>
                <div style={{ marginTop: "18px", marginLeft: "10px" }}>
                  <Stars rating={avgTeach} user={"average"} />
                </div>
              </Grid>
            </div>

            <div id="right" style={{ marginLeft: "auto" }}>
              <h3>Overall Rating:</h3>
              <h1>{(Math.round(avgOverall * 100) / 100).toFixed(2)} / 5</h1>
              <h3>{reviewList.length} reviews</h3>
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
            profList={profList}
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
                backgroundColor: "#69b4cf",
                borderRadius: 25,
                width: isMobileOnly ? "90vw" : "65vw",
                marginBottom: "5px",
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
                    <Stars
                      rating={
                        (review.workloadRating +
                          review.diffRating +
                          review.teachRating) /
                        3
                      }
                      user={review.user}
                    />
                  )
                }
                {
                  // if NOT on mobile, shows overallRating (number) for review in accordianSummary
                  !isMobileOnly &&
                    (
                      Math.round(
                        ((review.workloadRating +
                          review.diffRating +
                          review.teachRating) /
                          3) *
                          100
                      ) / 100
                    ).toFixed(2)
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

                {!review.anon && (
                  <Typography
                    key={review.user}
                    style={{ color: "white", marginLeft: "auto" }}
                  >
                    {review.user}
                  </Typography>
                )}
                {review.anon && (
                  <Typography key={review.user} style={{ marginLeft: "auto" }}>
                    anonymous
                  </Typography>
                )}
              </AccordionSummary>

              <AccordionDetails key={"accordionDetails" + review.user}>
                <Grid container direction="column">
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
                  <Grid container direction={isMobileOnly ? "column" : "row"}>
                    <div>
                      <Grid container direction="row">
                        <Typography
                          style={{ marginRight: "5px" }}
                          key={review.user + "workload"}
                        >
                          Workload:
                        </Typography>
                        <Stars
                          rating={review.workloadRating}
                          user={review.user}
                        />
                      </Grid>
                    </div>
                    <div
                      style={
                        isMobileOnly
                          ? { marginTop: "10px" }
                          : { marginLeft: "auto" }
                      }
                    >
                      <Grid container direction="row">
                        <Typography
                          style={{ marginRight: "5px" }}
                          key={review.user + "diff"}
                        >
                          Difficulty Of Content:
                        </Typography>
                        <Stars rating={review.diffRating} user={review.user} />
                      </Grid>
                    </div>
                    <div
                      style={
                        isMobileOnly
                          ? { marginTop: "10px" }
                          : { marginLeft: "auto" }
                      }
                    >
                      <Grid container direction="row">
                        <Typography
                          style={{ marginRight: "5px" }}
                          key={"teach" + review.user}
                        >
                          Teaching:
                        </Typography>
                        <Stars rating={review.teachRating} user={review.user} />
                      </Grid>
                    </div>
                  </Grid>

                  <Grid container direction="row" style={{ marginTop: "20px" }}>
                    <Typography key={"description" + review.user}>
                      {review.description}
                    </Typography>
                    {review.tookOnline && (
                      <Typography
                        key={"tookOnline" + review.user}
                        style={{ color: "white", marginLeft: "auto" }}
                      >
                        * online class *
                      </Typography>
                    )}
                  </Grid>
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
