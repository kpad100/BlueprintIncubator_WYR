import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { ArrowBackIos, ExpandMore, ExpandLess } from "@material-ui/icons";
import CoursesPage from "./CoursesPage";
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
  hideBorder: {
    "&.MuiAccordion-root:before": {
      display: "none",
    },
  },
  summaryCard: {
    backgroundColor: "#FF7F50",
    width: isMobileOnly ? "85vw" : "75vw",
    padding: "25px",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 25,
  },
  addReviewButton: {
    width: isMobileOnly ? "50vw" : "20vw",
    height: "2rem",
    borderRadius: 25,
    backgroundColor: "#bdf4ff",
    marginTop: "25px",
  },
  expandReviewsButton: {
    borderRadius: 25,
    backgroundColor: "#FF7F50",
    width: isMobileOnly ? "50vw" : "16vw",
  },
}));

const ReviewPage = ({ selectedCourse }) => {
  const classes = useStyles();
  const [returnToCoursesPage, setReturnToCoursesPage] = useState(false); // when true, returns CoursesPage component
  const [reviewList, setReviewList] = useState([]); // list of reviews
  const [selectedProf, setSelectedProf] = useState("All Professors");
  const [profList, setProfList] = useState([]);
  const [redditLinks, setRedditLinks] = useState([]);
  const [avgWorkload, setAvgWorkload] = useState(0);
  const [avgDiff, setAvgDiff] = useState(0);
  const [avgTeach, setAvgTeach] = useState(0);
  const [avgOverall, setAvgOverall] = useState(0); // avgRating of all reviews for course
  const [buttonPopup, setButtonPopup] = useState(false);
  const [expandAllReviews, setExpandAllReviews] = useState(true);

  const popUpAddReview = () => {
    setButtonPopup(true);
  };

  const closePopUp = () => {
    setButtonPopup(false);
  };

  // handles when back button is clicked
  const handleReturnToCoursesPage = () => {
    setReturnToCoursesPage(true);
  };

  useEffect(() => {
    db.collection("courses/")
      .doc(selectedCourse.code)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const profs = [];
          const redditLinks = [];
          if (doc.data().profs !== undefined && doc.data().profs.length > 0) {
            for (let i = 0; i < doc.data().profs.length; i++) {
              profs.push(doc.data().profs[i]);
            }
          }
          if (
            doc.data().redditLinks !== undefined &&
            doc.data().redditLinks.length > 0
          ) {
            for (let i = 0; i < doc.data().redditLinks.length; i++) {
              redditLinks.push(doc.data().redditLinks[i]);
            }
          }
          setProfList(profs);
          setRedditLinks(redditLinks);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    // receives review data from Firebase and updates reviewList and avgRating in state
    const unsubscribe = db
      .collection("courses/" + selectedCourse.code + "/reviews")
      .onSnapshot((querySnapshot) => {
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
      });

    return () => {
      unsubscribe();
    };
  }, [selectedCourse, selectedProf]);

  if (returnToCoursesPage) {
    return <CoursesPage />;
  } else {
    return (
      <div style={{ overflowX: "hidden" }}>
        <Grid container style={{ backgroundColor: "#69b4cf" }}>
          <IconButton onClick={handleReturnToCoursesPage}>
            <ArrowBackIos style={{ color: "white" }} />
          </IconButton>
          <img
            src="https://cdn.discordapp.com/attachments/812822571094900746/837106499863969812/wyr_transparent.png"
            height="50"
            style={{
              marginLeft: "auto",
              marginRight: "5px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            alt=""
          />
        </Grid>

        <br />

        <Card className={classes.summaryCard}>
          <Grid container alignItems="center">
            <div id="left">
              <h2>{selectedCourse.name}</h2>
              <Grid container style={{ alignItems: "center" }}>
                <Typography style={{ fontSize: 20 }}>
                  {selectedCourse.code}
                </Typography>
                <Card
                  style={{
                    backgroundColor: "white",
                    borderRadius: 25,
                    height: "30px",
                    width: "150px",
                    marginLeft: "10px",
                  }}
                >
                  <center>
                    <h5 style={{ marginTop: "5px" }}>
                      SIRS Rating: {selectedCourse.sirsRating} / 5
                    </h5>
                  </center>
                </Card>
              </Grid>
              <br />
              <Grid container>
                {isMobileOnly ? (
                  <h4>Showing averages for</h4>
                ) : (
                  <h3>Showing averages for</h3>
                )}

                <FormControl
                  style={{
                    backgroundColor: "white",
                    marginLeft: "10px",
                    marginTop: "15px",
                    height: 30,
                    padding: "5px",
                    borderRadius: 25,
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
              <center>
                <h1 style={{ marginBottom: "0px" }}>
                  {(Math.round(avgOverall * 100) / 100).toFixed(2)} / 5
                </h1>
                <h3 style={{ marginTop: "0px" }}>overall rating</h3>
                <h3>{reviewList.length} reviews</h3>
              </center>
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

        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ marginBottom: "15px" }}
        >
          <Grid item xs={isMobileOnly ? 5 : 6}>
            <h1>Reviews</h1>
          </Grid>
          <Grid item xs={isMobileOnly ? 6 : 2}>
            <Button
              variant="contained"
              className={classes.expandReviewsButton}
              onClick={() => {
                setExpandAllReviews(!expandAllReviews);
              }}
            >
              {expandAllReviews ? "minimize all reviews" : "expand all reviews"}
              {expandAllReviews ? <ExpandLess /> : <ExpandMore />}
            </Button>
          </Grid>
          {reviewList.map((review, i) => (
            <Accordion
              key={"accordian" + i}
              defaultExpanded
              expanded={expandAllReviews}
              className={classes.hideBorder}
              style={{
                backgroundColor: "#69b4cf",
                borderRadius: 25,
                width: isMobileOnly ? "90vw" : "75vw",
                marginBottom: "5px",
                padding: "10px",
              }}
            >
              <AccordionSummary
                key={"accordianSummary" + i}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  key={"prof" + i}
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
                      key={"grade" + i}
                      style={{ marginLeft: "auto" }}
                    >
                      Grade Received: {review.grade}
                    </Typography>
                  )
                }

                {!review.anon && (
                  <Typography
                    key={review.user + i}
                    style={{ color: "white", marginLeft: "auto" }}
                  >
                    {review.user}
                  </Typography>
                )}
                {review.anon && (
                  <Typography
                    key={review.user + i}
                    style={{ marginLeft: "auto" }}
                  >
                    anonymous
                  </Typography>
                )}
              </AccordionSummary>

              <AccordionDetails key={"accordionDetails" + i}>
                <Grid container direction="column">
                  {
                    // if ON mobile, shows grade received for review in accordianDetails
                    isMobileOnly && (
                      <Typography
                        key={"grade" + i}
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
                          key={"workload" + i}
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
                          key={"diff" + i}
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
                          key={"teach" + i}
                        >
                          Teaching:
                        </Typography>
                        <Stars rating={review.teachRating} user={review.user} />
                      </Grid>
                    </div>
                  </Grid>

                  <Grid container direction="row" style={{ marginTop: "20px" }}>
                    <Typography key={"description" + i}>
                      {review.description}
                    </Typography>
                    {review.tookOnline && (
                      <Typography
                        key={"tookOnline" + i}
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

        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ marginBottom: "100px" }}
        >
          <Grid item xs={isMobileOnly ? 11 : 8}>
            <h1>Useful Reddit Threads</h1>
            {redditLinks.length > 0 &&
              redditLinks.map((link, index) => (
                <div key={"redditDiv" + index}>
                  {isMobileOnly ? (
                    <a href={link} key={"redditLink" + index} target="blank">
                      {link.substring(0, 33) + ". . ."}
                    </a>
                  ) : (
                    <a href={link} key={"redditLink" + index} target="blank">
                      {link}
                    </a>
                  )}
                </div>
              ))}
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default ReviewPage;
