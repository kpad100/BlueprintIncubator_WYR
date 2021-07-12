import { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Star,
  StarOutline,
  StarHalf,
  ArrowBackIos,
  ExpandMore,
} from "@material-ui/icons";
import Dashboard from "./Dashboard";
import { db } from "../firebase/firebase";
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

const useStyles2 = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#4198b5",
    height: "flex",
  },
}));

class ReviewPage extends Component {
  state = {
    mountDashboard: false, // when true, mounts Dashboard component
    reviewList: [], // list of reviews
    avgRating: 0, // avgRating of all reviews for course
  };

  handleReturnToDashboard = () => {
    this.setState({ mountDashboard: true });
  };

  // Called immediately after a component is mounted. Setting state here will trigger re-rendering.
  componentDidMount() {
    // receives review data from Firebase and updates reviewList and avgRating in state
    db.collection(
      "courses/" + this.props.selectedCourseID + "/reviews"
    ).onSnapshot((querySnapshot) => {
      var reviews = [];
      let sum = 0;
      querySnapshot.forEach((doc) => {
        reviews.push(doc.data());
        sum += doc.data().rating;
      });
      this.setState({ reviewList: reviews, avgRating: sum / reviews.length });
    });
  }

  render() {
    const { selectedCourse } = this.props;
    if (this.state.mountDashboard) {
      return <Dashboard />;
    } else {
      return (
        <>
          <header>
            <IconButton onClick={this.handleReturnToDashboard}>
              <ArrowBackIos />
            </IconButton>
            <img
              src="https://cdn.discordapp.com/attachments/812822571094900746/837106499863969812/wyr_transparent.png"
              height="50"
              style={{
                marginTop: "15px",
                marginBottom: "15px",
                float: "right",
              }}
              alt=""
            />
          </header>
          <Card
            style={{
              backgroundColor: "#fb9263",
              marginBottom: "15px",
              marginTop: "5px",
              marginRight: "300px",
              marginLeft: "300px",
              padding: "25px",
            }}
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              zeroMinWidth
            >
              <h1>{selectedCourse.name}</h1>
              <h2>{selectedCourse.code}</h2>
              <div>
                {
                  // displays avgRating(rounded down to nearest whole number) filled stars
                  Array(Math.floor(this.state.avgRating)).fill(
                    <Star style={{ color: "white" }} />
                  )
                }
                {
                  // displays half star if avgRating decimal >= 0.25
                  this.state.avgRating - Math.floor(this.state.avgRating) >=
                    0.25 && <StarHalf style={{ color: "white" }} />
                }
                {
                  // displays outlined star if avgRating decimal < 0.25
                  this.state.avgRating - Math.floor(this.state.avgRating) > 0 &&
                    this.state.avgRating - Math.floor(this.state.avgRating) <
                      0.25 && <StarOutline />
                }
                {
                  // displays 5 - (avgRating rounded up to nearest whole number) outlined stars
                  Array(5 - Math.ceil(this.state.avgRating)).fill(
                    <StarOutline />
                  )
                }
                {this.state.avgRating}/5
              </div>
              <p style={{ marginLeft: "15px" }}>
                ({this.state.reviewList.length} reviews)
              </p>
            </Grid>
          </Card>

          <h2 style={{ marginLeft: "300px" }}>Reviews</h2>
          <Grid
            container
            direction="row"
            spacing={2}
            style={{ padding: 20 }}
            justify="center"
            alignItems="flex-start"
          >
            {this.state.reviewList.map((review) => (
              <Grid item xs={7} zeroMinWidth>
                <Paper className={useStyles2.paper}>
                  <Accordion backgroundcolor="#4198b5">
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography style={{ marginRight: "30px" }}>
                        Username
                      </Typography>
                      <div style={{ marginRight: "30px" }}>
                        {
                          // displays avgRating(rounded down to nearest whole number) filled stars
                          Array(Math.floor(review.rating)).fill(<Star />)
                        }
                        {
                          // displays half star if avgRating decimal >= 0.25
                          review.rating - Math.floor(review.rating) >= 0.25 && (
                            <StarHalf />
                          )
                        }
                        {
                          // displays outlined star if avgRating decimal < 0.25
                          review.rating - Math.floor(review.rating) > 0 &&
                            review.rating - Math.floor(review.rating) <
                              0.25 && <StarOutline />
                        }
                        {
                          // displays 5 - (avgRating rounded up to nearest whole number) outlined stars
                          Array(5 - Math.ceil(review.rating)).fill(
                            <StarOutline />
                          )
                        }
                      </div>
                      <Typography>Professor: {review.prof}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                      <Typography variant="body2" align="left">
                        {review.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      );
    }
  }
}

export default ReviewPage;
