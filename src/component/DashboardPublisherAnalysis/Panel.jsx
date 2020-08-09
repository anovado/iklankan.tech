import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Grid from "@material-ui/core/Grid";
import moment from "moment";
import numeral from "numeral";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: "2.2vh",
    flexBasis: "33.33%",
    flexShrink: 0,
    color: "#f1faee",
    fontWeight: 600,
    textAlign: "left",
    marginLeft: 0,
  },
  status: {
    textAlign: "left",
    fontSize: "2vh",
    margin: "5px 0",
  },
  secondaryHeading: {
    fontSize: "2.2vh",
    color: "#f1faee",
    fontWeight: 500,
    textAlign: "left",
  },
  summary: {
    backgroundColor: "#1D3557",
    color: "#F0F4FA",
  },
  details: {
    borderRadius: 12,
    color: "#191923",
    textAlign: "left",
    backgroundColor: "#F0F4FA",
  },
  panel: {
    borderRadius: 12,
    color: "#F0F4FA",
  },
  name: {
    fontWeight: 500,
    fontSize: "2vh",
  },
  periode: {
    fontSize: "2vh",
    margin: "2px 0",
  },
  user: {
    fontWeight: 500,
    fontSize: 16,
  },
}));

export const DashboardPublisherPanel = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  // handle for accordion panel
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const dataTrx = props.dataTrx;
  const dataTrxDtl = dataTrx.spot_list;

  return (
    <Fragment>
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className={classes.panel}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={classes.summary}
        >
          <div>
            <Typography className={classes.heading}>
              Tanggal transaksi: {moment(dataTrx.updated_at).calendar()}
            </Typography>
            <Typography className={classes.status}>
              Status:{" "}
              <strong>{dataTrx.midtrans_status.transaction_status}</strong>
            </Typography>
            <Typography className={classes.secondaryHeading}>
              Rp. {numeral(dataTrx.total_price).format(0, 0)}, 00
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Grid container spacing={3}>
            {dataTrxDtl.map((elem, index) => (
              <Grid item xs={12}>
                <Typography className={classes.name}>
                  {elem.spot_detail.name}
                </Typography>
                <Typography className={classes.periode}>
                  {moment(elem.starting_date).calendar(null, {
                    sameElse: "DD/MM/YYYY",
                  })}{" "}
                  -{" "}
                  {moment(elem.starting_date).add(1, "M").format("DD/MM/YYYY")}
                </Typography>
                <Typography>
                  Disewa oleh:{" "}
                  <span className={classes.user}>
                    {dataTrx.user_detail.name}
                  </span>
                </Typography>
              </Grid>
            ))}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Fragment>
  );
};
