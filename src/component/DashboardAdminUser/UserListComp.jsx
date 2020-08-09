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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingLeft: "15px",
    paddingRight: "15px",
  },
  itemTitle: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightBold,
    textAlign: "left",
  },
  itemSubTitle: {
    fontSize: theme.typography.pxToRem(10),
    fontWeight: theme.typography.fontWeightLight,
    textAlign: "left",
  },
  imageSize: {
    martgin: "auto",
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  buttonDelete: {
    // margin: theme.spacing(1),
    backgroundColor: "#e63946",
    color: "#fff",
  },
}));

export const UserListComp = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion style={{ boxShadow: "0 1px 2px 1px rgba(0,0,0,0.2)" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container wrap="nowrap" spacing={1}>
            <Grid item>
              <Avatar alt="User's picture" src={props.user.profil_pict} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography className={classes.itemTitle}>
                {props.user.name}
              </Typography>
              <Typography className={classes.itemSubTitle}>
                {props.user.address}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
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
                onClick={() => props.delUser(props.user.id)}
              >
                <DeleteIcon />
              </Button>
            </div>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
