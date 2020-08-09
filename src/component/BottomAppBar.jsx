import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import GpsFixedRoundedIcon from "@material-ui/icons/GpsFixedRounded";
import HistoryRoundedIcon from "@material-ui/icons/HistoryRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: `calc(100vh-3vmax)`,
    zIndex: 2500,
    border: "none",
    backgroundColor: "#fff",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
    },
    overflowY: "auto",
  },
  rootNavBar: {
    "& > *": {},
    width: "100%",
    bottom: 0,
    position: "fixed",
    borderTop: "1px blur #6d6875",
    backgroundColor: "#fff",
    boxShadow: "0px 0 2px rgba(0, 0, 0, 0.3)",
  },
  actionRoot: {
    color: "#1d3557",
    minWidth: "40px",
    backgroundColor: "#fff",
  },
  selectedRoot: {
    color: "#1d3557",
  },
  changeLabel: {
    fontSize: "12px",
  },
}));

const BottomAppBar = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");
  const history = useHistory();

  // to handle changing routes
  const handleChange = (event, newValue) => {
    history.push(`/${newValue}`);
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        classes={{ root: classes.rootNavBar }}
        showLabels
      >
        <BottomNavigationAction
          label="Home"
          value=""
          classes={{
            root: classes.actionRoot,
            selected: classes.selectedRoot,
            label: classes.changeLabel,
          }}
          icon={
            <HomeRoundedIcon
              fontSize="large"
              className={classes.selectedRoot}
            />
          }
        />
        <BottomNavigationAction
          label="Spot"
          value="allspots"
          icon={
            <GpsFixedRoundedIcon
              fontSize="large"
              className={classes.selectedRoot}
            />
          }
          classes={{ root: classes.actionRoot, selected: classes.selectedRoot }}
        />
        <BottomNavigationAction
          label="Cart"
          value="cart"
          classes={{ root: classes.actionRoot, selected: classes.selectedRoot }}
          icon={
            <ShoppingCartRoundedIcon
              fontSize="large"
              className={classes.selectedRoot}
            />
          }
        />
        <BottomNavigationAction
          label="Riwayat"
          value="transaction/history"
          classes={{ root: classes.actionRoot, selected: classes.selectedRoot }}
          icon={
            <HistoryRoundedIcon
              fontSize="large"
              className={classes.selectedRoot}
            />
          }
        />
        <BottomNavigationAction
          label="Profil"
          value="profile"
          classes={{ root: classes.actionRoot, selected: classes.selectedRoot }}
          icon={
            <AccountCircleRoundedIcon
              fontSize="large"
              className={classes.selectedRoot}
            />
          }
        />
      </BottomNavigation>
    </React.Fragment>
  );
};

export default BottomAppBar;
