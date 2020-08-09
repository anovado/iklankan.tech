import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0 0 0",
    display: "flex",
    justifyContent: "center",
  },
  mediaContainer: {
    color: "#191923",
  },
  title: {
    color: "#191923",
    textAlign: "left",
    marginLeft: "15px",
    marginBottom: 10,
    marginTop: 15,
    fontWeight: 500,
    fontSize: "1.5rem",
  },
  subtitle: {
    marginTop: 0,
    textAlign: "left",
    marginLeft: "15px",
    color: "#7a7a7a",
    fontSize: "14px",
    display: "flex",
  },
}));

export default function Banner(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <h3 className={classes.title}>{props.name}</h3>
      <div className={classes.subtitle}>
        <div>
          <RoomRoundedIcon />
        </div>
        <div
          style={{
            alignItems: "center",
            textTransform: "capitalize !important",
          }}
        >
          {props.address}
        </div>
      </div>
    </Fragment>
  );
}
