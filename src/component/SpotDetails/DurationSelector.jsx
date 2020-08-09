import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import SimpleBackdrop from "./Loading";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "25vmin",
    marginTop: 15,
    marginLeft: 0,
    marginRight: 0,
  },
  duration: {
    textAlign: "left",
  },
  date: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    display: "flex",
    justifyContent: "space-between",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: 500,
    color: "#457B9D",
    letterSpacing: 1,
    marginLeft: "2vmin",
  },
  priceContainer: {
    display: "flex",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 15,
    justifyContent: "left",
  },
  labelBrowse: {
    textAlign: "left",
    marginLeft: "5vmin",
    fontSize: "1rem",
    marginTop: 3,
    marginBottom: 0,
    color: "#191923",
    fontWeight: 500,
  },
  priceDetail: {
    marginTop: 10,
    marginLeft: 5,
  },
}));

export default function DurationSelector(props) {
  const classes = useStyles();

  if (!props.price) {
    return <SimpleBackdrop />;
  } else {
    return (
      <Fragment>
        <div className={classes.priceContainer}>
          Rp <div className={classes.price}>{props.price.toLocaleString()}</div>
          <div className={classes.priceDetail}> / bulan</div>
        </div>
      </Fragment>
    );
  }
}
