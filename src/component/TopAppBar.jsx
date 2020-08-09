import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    bottom: "auto",
    top: 0,
    boxShadow: "0 0px 2px 0 rgba(0,0,0,0.3)",
    backgroundColor: "#fff",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
    color: "#1D3557",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 700,
  },
}));

const TopAppBar = (props) => {
  const classes = useStyles();
  // let history = useHistory();

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        style={{ backgroundColor: "#fff" }}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolBar}>
          <div style={{ fontSize: "1.3rem" }}>{props.title}</div>
          <IconButton
            component={Link}
            to="/allspots/search"
            aria-label="search"
            color="inherit"
            style={{ padding: 10 }}
          >
            <Avatar style={{ backgroundColor: "#1D3557" }}>
              <SearchRoundedIcon />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default TopAppBar;
