import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import StorefrontRoundedIcon from "@material-ui/icons/StorefrontRounded";
import CropOriginalRoundedIcon from "@material-ui/icons/CropOriginalRounded";
import PermIdentityRoundedIcon from "@material-ui/icons/PermIdentityRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: `calc(100vh-3vmax)`,
    zIndex: 2500,
    border: "none",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
    },
    overflowY: "auto",
  },
  rootNavBar: {
    backgroundColor: "#457B9D",
    "& > *": {},
    width: "100%",
    bottom: 0,
    position: "fixed",
    borderTop: "1px blur #6d6875",
    boxShadow: "0px 0 2px rgba(0, 0, 0, 0.3)",
    zIndex: 1000,
  },
  actionRoot: {
    color: "#F0F4FA",
    minWidth: "40px",
  },
  selectedRoot: {
    color: "#F0F4FA",
  },
  changeLabel: {
    fontSize: "12px",
  },
}));

const DashboardAdminAppBar = (props, postLogout) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  postLogout = () => {
    if (props.doLogOut) {
      props.doLogOut();
      props.history.replace("/");
    }
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
          label="User"
          value="user"
          component={Link}
          to="/dashboard/admin/user"
          classes={{ root: classes.actionRoot, selected: classes.selectedRoot }}
          icon={
            <PermIdentityRoundedIcon
              fontSize="large"
              className={classes.selectedRoot}
            />
          }
        />
        <BottomNavigationAction
          label="Publisher"
          value="publisher"
          component={Link}
          to="/dashboard/admin/publisher"
          icon={
            <StorefrontRoundedIcon
              fontSize="large"
              className={classes.selectedRoot}
            />
          }
          classes={{ root: classes.actionRoot, selected: classes.selectedRoot }}
        />
        <BottomNavigationAction
          component={Link}
          to="/dashboard/admin/spot"
          label="Spot"
          value="spot"
          classes={{ root: classes.actionRoot, selected: classes.selectedRoot }}
          icon={
            <CropOriginalRoundedIcon
              fontSize="large"
              className={classes.selectedRoot}
            />
          }
        />
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Exit"
          value="exit"
          classes={{ root: classes.actionRoot, selected: classes.selectedRoot }}
          onClick={() => postLogout()}
          icon={
            <ExitToAppRoundedIcon
              fontSize="large"
              className={classes.selectedRoot}
            />
          }
        />
      </BottomNavigation>
    </React.Fragment>
  );
};

export default DashboardAdminAppBar;
