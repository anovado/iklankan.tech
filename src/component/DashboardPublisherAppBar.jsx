import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import AssessmentRoundedIcon from "@material-ui/icons/AssessmentRounded";
import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";

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
    backgroundColor: "#1D3557",
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

const DashboardPublisherAppBar = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const handleRequest = async (menu) => {
  //   await props.history.push("/" + menu);
  // };

  return (
    <React.Fragment>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        classes={{ root: classes.rootNavBar }}
        showLabels
      >
        <BottomNavigationAction
          label="Request"
          value="request"
          component={Link}
          to="/dashboard/publisher"
          classes={{ root: classes.actionRoot, selected: classes.selectedRoot }}
          icon={
            <AssignmentRoundedIcon
              fontSize="large"
              className={classes.selectedRoot}
            />
          }
        />
        <BottomNavigationAction
          label="Kontrol"
          value="control"
          component={Link}
          to="/dashboard/publisher/control"
          icon={
            <SettingsRoundedIcon
              fontSize="large"
              className={classes.selectedRoot}
            />
          }
          classes={{ root: classes.actionRoot, selected: classes.selectedRoot }}
        />
        <BottomNavigationAction
          component={Link}
          to="/dashboard/publisher/analisis"
          label="Analisis"
          value="data"
          classes={{ root: classes.actionRoot, selected: classes.selectedRoot }}
          icon={
            <AssessmentRoundedIcon
              fontSize="large"
              className={classes.selectedRoot}
            />
          }
        />
        <BottomNavigationAction
          component={Link}
          to="/dashboard/publisher/profile"
          label="Profil"
          value="Profil"
          classes={{ root: classes.actionRoot, selected: classes.selectedRoot }}
          icon={
            <StoreRoundedIcon
              fontSize="large"
              className={classes.selectedRoot}
            />
          }
        />
        <BottomNavigationAction
          // onClick={() => handleRequest("profile2")}
          component={Link}
          to="/profile"
          label="Exit"
          value="exit"
          // onClick={handleChange}
          classes={{ root: classes.actionRoot, selected: classes.selectedRoot }}
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

export default DashboardPublisherAppBar;
