import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { AlerSnackbar } from "../../component/Snackbar/Snackbar";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { motion } from "framer-motion";

import { hideAlert, showAlertCustom } from "../../redux/action/customAction";
import TopAppBarAdmin from "../../component/TopAppBarAdmin";
import { connect } from "react-redux";
import { doLogOut } from "../../redux/action/userAction";

const useStyles = (theme) => ({
  box: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: "90px",
  },
  spot: {
    marginLeft: 5,
    marginRight: 5,
    width: "20vmin",
    marginTop: "10vmin",
  },
  container: {
    fontSize: "3vh",
    textDecoratioin: "none",
    color: "#1D3557",
  },
});

class AdminHome extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    const status = localStorage.getItem("status");
    const login = localStorage.getItem("isLogin");
    if (login) {
      if (status === "user") {
        await this.props.history.replace("/");
      }
    } else {
      this.props.history.push("/signin");
    }
  };
  handleLogout = async () => {
    if (this.props.doLogOut) {
      await this.props.doLogOut();
      await this.props.history.replace("/");
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <TopAppBarAdmin title={"Dashboard Admin"} />
        <AlerSnackbar
          hideAlert={this.props.hideAlert}
          alert={this.props.alert}
        />
        <div className={classes.box}>
          <Grid container spacing={0}>
            <Grid item xs={6} sm={6} lg={3}>
              <Link to="/">
                <motion.div
                  className={classes.container}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 70,
                  }}
                >
                  <img
                    src={require("../../assets/images/browser.png")}
                    alt="home"
                    className={classes.spot}
                  />
                  <div>Home</div>
                </motion.div>
              </Link>
            </Grid>
            <Grid item xs={6} sm={6} lg={3}>
              <Link to="/dashboard/admin/user">
                <motion.div
                  className={classes.container}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 70,
                  }}
                >
                  <img
                    src={require("../../assets/images/person.png")}
                    alt="user"
                    className={classes.spot}
                  />
                  <div>User</div>
                </motion.div>
              </Link>
            </Grid>
            <Grid item xs={6} sm={6} lg={3}>
              <Link to="/dashboard/admin/spot">
                <motion.div
                  className={classes.container}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 70,
                  }}
                >
                  <img
                    src={require("../../assets/images/megaphone.png")}
                    alt="publisher"
                    className={classes.spot}
                  />
                  <div>Publisher</div>
                </motion.div>
              </Link>
            </Grid>
            <Grid item xs={6} sm={6} lg={3}>
              <Link to="/dashboard/admin/spot">
                <motion.div
                  className={classes.container}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 70,
                  }}
                >
                  <img
                    src={require("../../assets/images/billboard-color.png")}
                    alt="spot"
                    className={classes.spot}
                  />
                  <div>Spot</div>
                </motion.div>
              </Link>
            </Grid>
          </Grid>
          <Link to="/dashboard/admin/spot">
            <motion.div
              className={classes.container}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 70,
              }}
            >
              <img
                src={require("../../assets/images/exit.png")}
                alt="exit"
                className={classes.spot}
                onClick={this.handleLogout}
              />
              <div>Logout</div>
            </motion.div>
          </Link>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    alert: state.custom.alert,
  };
};

const mapDispatchToProps = {
  AlerSnackbar,
  hideAlert,
  showAlertCustom,
  doLogOut,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(AdminHome));
