import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      //   margin: theme.spacing(1),
      //   width: "75vmin",
    },
    "& label.Mui-focused": {
      color: "#1D3557",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1D3557",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        //set soft dark input field
        borderColor: "#A6A2A0",
      },
      "&:hover fieldset": {
        borderColor: "#1D3557",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1D3557",
      },
    },
    borderColor: "#1d3557",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  appBar: {
    bottom: "auto",
    top: 0,
    boxShadow: "0 0px 2px 0 rgba(0,0,0,0.3)",
    backgroundColor: "#fff",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-around",
    color: "#1D3557",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchBar = (props) => {
  const classes = useStyles();
  const [userSearch, setUserSearch] = React.useState("");
  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => props.handleSearch(e)}>
            <div className={classes.searchIcon}>
              <SearchRoundedIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              name="userSearch"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
            {/* <TextField
              label="search"
              id="standard-size-small"
              size="small"
              variant="outlined"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              //   style={{ marginLeft: 50 }}
            /> */}
          </form>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default SearchBar;
