import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import BottomAppBar from "../../component/BottomAppBar";
// import SimpleBackdrop from "../component/SpotDetails/Loading";
import TopAppBar from "../../component/TopAppBar";

const useStyles = (theme) => ({
  logo: {
    width: "40vmin",
  },
  title: {
    marginTop: "15vmin",
    marginBottom: "10vmin",
    fontWeight: 600,
    fontSize: "4.5vh",
  },
  thanks: {
    fontWeight: 500,
    fontSize: "3.4vh",
    marginTop: "10vmin",
    marginBottom: "10vmin",
  },
  buttonDashboard: {
    width: "80vmin",
    paddingLeft: 5,
    paddingRight: 5,
    textDecoration: "none",
    textTransform: "capitalize",
    color: "#fff",
    backgroundColor: "#457B9D",
    "&:hover": {
      backgroundColor: "#457B9D",
    },
  },
});

class FailedPage extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    // if (localStorage.getItem("isLogin")) {
    //   //       await this.props.getUserData();
    // } else {
    //   this.props.history.push("/signin");
    // }
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <TopAppBar title={"Halaman Transaksi"} />
        <div style={{ height: "70px" }} />
        <h5 className={classes.title}>Transaksi Gagal</h5>
        <div>
          <img
            src={require("../../assets/images/close.png")}
            alt="logo success"
            className={classes.logo}
          />
        </div>
        <div className={classes.thanks}>Silakan coba lagi</div>
        <Button
          variant="contained"
          component={Link}
          to="/"
          className={classes.buttonDashboard}
        >
          Kembali ke Home
        </Button>
        <BottomAppBar />
      </Fragment>
    );
  }
}
export default withStyles(useStyles)(FailedPage);
