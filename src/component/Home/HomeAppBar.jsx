import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { useHistory } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

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
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const HomeAppBar = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div>
            <img
              src={require("../../assets/images/example_logo.png")}
              alt="iklankan"
              style={{ width: "40vw" }}
            />
          </div>
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

export default HomeAppBar;
