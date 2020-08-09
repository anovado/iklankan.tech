import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";

import numeral from "numeral";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0 1px 2px 1px rgba(29,53,87,0.4)",
    height: "40vmin",
    marginBottom: 10,
    marginTop: 20,
    backgroundColor: "#F0F4FA",
    marginLeft: 20,
    marginRight: 20,
  },
  name: {
    fontSize: "5vmin",
    top: 5,
    left: 5,
    marginTop: 5,
    textAlign: "left",
    fontWeight: 500,
  },
  price: {
    fontSize: "10vmin",
    marginTop: 0,
    paddingTop: 0,
    marginBottom: 0,
    color: "#457B9D",
    textAlign: "center",
    fontWeight: 700,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    textAlign: "left",
    paddingLeft: 10,
    paddingTop: 5,
    position: "relative",
  },
  timestamp: {
    fontSize: "2.3vh",
    color: "#e63946",
    textAlign: "right",
  },
}));

export default function CardSummary(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <p className={classes.name}>Total pendapatan :</p>
            {props.isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  // marginTop: "10vmin",
                }}
              >
                <CircularProgress color="#457b9d" />
              </div>
            ) : (
              <p className={classes.price}>
                Rp {numeral(props.income).format(0, 0)},-
              </p>
            )}
          </CardContent>
        </div>
      </Card>
    </Fragment>
  );
}
