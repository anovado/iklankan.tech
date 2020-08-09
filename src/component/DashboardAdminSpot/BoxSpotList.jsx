import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import PageviewRoundedIcon from "@material-ui/icons/PageviewRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingLeft: "15px",
    paddingRight: "15px",
  },
  itemTitle: {
    fontSize: "2vh",
    fontWeight: theme.typography.fontWeightBold,
    textAlign: "left",
  },
  itemSubTitle: {
    fontSize: "1.5vh",
    fontWeight: theme.typography.fontWeightLight,
    textAlign: "left",
  },
  imageSize: {
    martgin: "auto",
    width: "10vmin",
  },
  buttonDelete: {
    margin: theme.spacing(1),
    backgroundColor: "#e63946",
    color: "#fff",
  },
  buttonDetail: {
    margin: theme.spacing(1),
    backgroundColor: "#457b9d",
    color: "#fff",
  },
  details: {
    paddingTop: 0,
    paddingBottom: 10,
  },
}));

export const BoxSpotList = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion style={{ boxShadow: "0 1px 2px 1px rgba(0,0,0,0.3)" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container wrap="nowrap" spacing={1}>
            <Grid item>
              <Avatar
                variant="square"
                alt={"image spot"}
                className={classes.imageSize}
                src={props.spot.image.name}
              />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography className={classes.itemTitle}>
                {props.spot.name}
              </Typography>
              <Typography className={classes.itemSubTitle}>
                {props.spot.address}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <div>
              <Button
                variant="contained"
                className={classes.buttonDelete}
                onClick={() => props.handleDelete(props.spot.id)}
              >
                <DeleteIcon />
              </Button>
              <Button
                variant="contained"
                className={classes.buttonDetail}
                onClick={() => props.handleClick(props.spot.id)}
              >
                <PageviewRoundedIcon />
              </Button>
            </div>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
