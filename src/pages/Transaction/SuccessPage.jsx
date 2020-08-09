import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import BottomAppBar from "../../component/BottomAppBar";
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
    marginBottom: "3vmin",
  },
  wait: {
    fontSize: "2.5vh",
  },
  buttonDashboard: {
    width: "80vmin",
    marginTop: "4vmin",
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

class SuccessPage extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <TopAppBar title={"Halaman Transaksi"} />
        <div style={{ height: "70px" }} />
        <h5 className={classes.title}>Transaksi Berhasil</h5>
        <div>
          <img
            src={require("../../assets/images/tick.png")}
            alt="logo success"
            className={classes.logo}
          />
        </div>
        <div className={classes.thanks}>
          Terima kasih telah bertransaksi dengan kami
        </div>
        <div className={classes.wait}>
          Publisher akan segera menghubungi anda
        </div>
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
export default withStyles(useStyles)(SuccessPage);
