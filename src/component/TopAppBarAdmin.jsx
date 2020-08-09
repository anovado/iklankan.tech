import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    bottom: "auto",
    top: 0,
    boxShadow: "0 0px 2px 0 rgba(0,0,0,0.3)",
    backgroundColor: "#457B9D",
  },
  toolBar: {
    display: "flex",
    color: "#fff",
    alignItems: "center",
    marginBottom: 0,
    paddingBottom: 0,
    marginLeft: "5vmin",
    paddingLeft: 0,
  },
}));

const TopAppBarAdmin = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div style={{ fontSize: "1.3rem" }}>{props.title}</div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default TopAppBarAdmin;
