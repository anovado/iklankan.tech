import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "auto",
    paddingLeft: "15px",
    paddingRight: "15px",
  },
  itemTitle: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightBold,
    textAlign: "left",
  },
  itemStatus: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightLight,
    borderRadius: "5px",
    display: "inline-block",
    paddingLeft: "5px",
    textAlign: "left",
  },
  duration: {
    fontSize: theme.typography.pxToRem(16),
    // fontWeight: theme.typography.fontWeightLight,
    color: "#1D3557",
    borderRadius: "5px",
    display: "inline-block",
    paddingLeft: "5px",
    textAlign: "left",
    marginTop: "2vmin",
  },
  insideItem: {
    fontSize: theme.typography.pxToRem(12),
    textAlign: "left",
  },
  itemSubTitle: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightLight,
    textAlign: "left",
  },
  price: {
    fontSize: "2vh",
    textAlign: "left",
    color: "#F0F4FA",
    fontWeight: 500,
  },
}));

export const HistoryUserComp = (props) => {
  const classes = useStyles();
  const dataTransaksi = props.dataTransaksi;

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ backgroundColor: "#1D3557", color: "#fff" }}
        >
          <Grid container>
            <Grid item xs={8}>
              <Typography className={classes.itemTitle}>
                {moment(dataTransaksi.updated_at).calendar()}
              </Typography>
            </Grid>
            <Grid item xs={4} justify="flex-end">
              <Typography className={classes.itemStatus}>
                {dataTransaksi.midtrans_status.transaction_status}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.price}>
                Rp {dataTransaksi.total_price.toLocaleString()},-
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        {props.dataTransaksi.spot_list.map((el, index) => {
          return (
            <AccordionDetails
              key={index}
              style={{
                backgroundColor: "#F0F4FA",
              }}
            >
              <div className={classes.insideItem}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography className={classes.itemTitle}>
                      {el.spot_detail.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.duration}>
                      {moment(el.starting_date).format("L")} -{" "}
                      {moment(el.starting_date)
                        .add(el.durations, "M")
                        .format("L")}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </AccordionDetails>
          );
        })}
      </Accordion>
    </div>
  );
};
