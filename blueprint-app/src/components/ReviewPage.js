import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import Card from "@material-ui/core/Card";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

const ReviewPage = () => {
  const classes2 = useStyles2();
  return (
    <>
    <header>
    <img
              src="https://cdn.discordapp.com/attachments/812822571094900746/837106499863969812/wyr_transparent.png"
              height="50"
              style={{ marginTop: "15px", marginBottom: "15px", float:"right" }}
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
          direction="row"
          alignItems="center"
          justify="center"
          zeroMinWidth
        >
          <h1 >Class 2</h1>
          <StarIcon style={{ marginLeft: "100px", fontSize:"40px", alignItems:"center" }} />
          <StarIcon style={{ marginLeft: "30px", fontSize:"40px", alignItems:"center" }}/>
          <StarIcon style={{ marginLeft: "30px", fontSize:"40px", alignItems:"center" }}/>
          <StarHalfIcon style={{ marginLeft: "30px", fontSize:"40px", alignItems:"center" }}/>
          <StarOutlineIcon style={{ marginLeft: "30px", fontSize:"40px", alignItems:"center" }}/>
          <p style={{ marginLeft: "15px" }}>(191 reviews)</p>
        </Grid>
      </Card>
      <h2 style={{marginLeft: "300px"}}>Reviews</h2>
      <Grid
        container
        direction="row"
        spacing={2}
        style={{ padding: 20 }}
        justify="center"
        alignItems="flex-start"
      >
        <Grid item xs={7} zeroMinWidth>
          <Paper className={classes2.paper}>
            <Typography variant="subtitle2" align="left" color="textPrimary">
              Username
            </Typography>
            <Accordion backgroundColor="#4198b5">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="body2">
                  This is class is xyz and I would reccomend it because xyz...
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography variant="body2" align="left">
                  This is a review. This is a review. This is a review. This is
                  a review. This is a review. This is a review. This is a
                  review. This is a review. This is a review. This is a review.
                  This is a review. This is a review. This is a review. This is
                  a review. This is a review. This is a review. This is a
                  review. This is a review. This is a review. This is a review.
                  This is a review. This is a review. This is a review. This is
                  a review. This is a review. This is a review. This is a
                  review. This is a review. This is a review. This is a review.
                  This is a review. This is a review. This is a review.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>

        <Grid item xs={7} zeroMinWidth>
          <Paper className={classes2.paper}>
            <Typography variant="subtitle2" align="left" color="textPrimary">
              Username
            </Typography>
            <Accordion backgroundColor="#add8e6">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="body2">
                  This is class is xyz and I would reccomend it because xyz...
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography variant="body2" align="left">
                  This is a review. This is a review. This is a review. This is
                  a review. This is a review. This is a review. This is a
                  review. This is a review. This is a review. This is a review.
                  This is a review. This is a review. This is a review. This is
                  a review. This is a review. This is a review. This is a
                  review. This is a review. This is a review. This is a review.
                  This is a review. This is a review. This is a review. This is
                  a review. This is a review. This is a review. This is a
                  review. This is a review. This is a review. This is a review.
                  This is a review. This is a review. This is a review.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>

        <Grid item xs={7} zeroMinWidth>
          <Paper className={classes2.paper}>
            <Typography variant="subtitle2" align="left" color="textPrimary">
              Username
            </Typography>
            <Accordion backgroundColor="#add8e6">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="body2">
                  This is class is xyz and I would reccomend it because xyz...
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography variant="body2" align="left">
                  This is a review. This is a review. This is a review. This is
                  a review. This is a review. This is a review. This is a
                  review. This is a review. This is a review. This is a review.
                  This is a review. This is a review. This is a review. This is
                  a review. This is a review. This is a review. This is a
                  review. This is a review. This is a review. This is a review.
                  This is a review. This is a review. This is a review. This is
                  a review. This is a review. This is a review. This is a
                  review. This is a review. This is a review. This is a review.
                  This is a review. This is a review. This is a review.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
        <Grid item xs={7} zeroMinWidth>
          <Paper className={classes2.paper}>
            <Typography variant="subtitle2" align="left" color="textPrimary">
              Username
            </Typography>
            <Accordion backgroundColor="#add8e6">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="body2">
                  This is class is xyz and I would reccomend it because xyz...
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography variant="body2" align="left">
                  This is a review. This is a review. This is a review. This is
                  a review. This is a review. This is a review. This is a
                  review. This is a review. This is a review. This is a review.
                  This is a review. This is a review. This is a review. This is
                  a review. This is a review. This is a review. This is a
                  review. This is a review. This is a review. This is a review.
                  This is a review. This is a review. This is a review. This is
                  a review. This is a review. This is a review. This is a
                  review. This is a review. This is a review. This is a review.
                  This is a review. This is a review. This is a review.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewPage;
