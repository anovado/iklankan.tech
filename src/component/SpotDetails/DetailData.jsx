import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AspectRatioRoundedIcon from "@material-ui/icons/AspectRatioRounded";
import OpenWithRoundedIcon from "@material-ui/icons/OpenWithRounded";
import SwapHorizRoundedIcon from "@material-ui/icons/SwapHorizRounded";
import HighlightRoundedIcon from "@material-ui/icons/HighlightRounded";

const useStyles = makeStyles({
  root: {
    marginBottom: 0,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 12,
  },
  biodata: {
    display: "flex",
    textAlign: " left",
    fontSize: "17px",
    marginTop: " 0",
    color: "#191923",
    zIndex: "1",
    alignItems: "center",
    fontWeight: 500,
  },
  subTitle: {
    fontSize: "1.3rem",
    fontWeight: 500,
    color: "#191923",
    textAlign: "left",
    marginTop: 20,
    marginBottom: 15,
  },
  divider: {
    marginBottom: "4vmin",
    marginTop: "4vmin",
    border: 0,
    borderTop: "1px solid #eee",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default function DetailData(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <p className={classes.subTitle}>Deskripsi</p>
        <div
          className={classes.biodata}
          style={{
            fontWeight: "normal",
            fontSize: "14px",
            marginBottom: "5vmin",
          }}
        >
          {props.description}
        </div>
        <hr className={classes.divider} />

        <div className={classes.biodata} style={{ marginTop: "5vmin" }}>
          <div style={{ marginLeft: "8vmin", marginRight: "10vmin" }}>
            <AspectRatioRoundedIcon />
          </div>
          <div>
            {props.length} x {props.width} meter ({props.orientation})
          </div>
        </div>
        <hr className={classes.divider} />

        <div className={classes.biodata}>
          <div style={{ marginLeft: "8vmin", marginRight: "10vmin" }}>
            <OpenWithRoundedIcon />
          </div>
          <div>Menghadap {props.facing}</div>
        </div>
        <hr className={classes.divider} />

        <div className={classes.biodata}>
          <div style={{ marginLeft: "8vmin", marginRight: "10vmin" }}>
            <SwapHorizRoundedIcon />
          </div>
          <div>{props.side} Sisi Display</div>
        </div>
        <hr className={classes.divider} />

        <div className={classes.biodata}>
          <div style={{ marginLeft: "8vmin", marginRight: "10vmin" }}>
            <HighlightRoundedIcon />
          </div>
          <div>{props.lighting} Lampu Sorot</div>
        </div>
        <hr className={classes.divider} />
      </div>
    </Fragment>
  );
}
