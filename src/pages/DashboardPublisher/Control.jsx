import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { motion } from "framer-motion";

import CardControlDashboardPublisher from "../../component/DashboardPublisherControl/CardControl";
import DashboardPublisherAppBar from "../../component/DashboardPublisherAppBar";
import AddSpotButton from "../../component/DashboardPublisherControl/AddSpotButton";
import TopAppBarPublisher from "../../component/TopAppBarDashboardPublisher";
import { AlerSnackbar } from "../../component/Snackbar/Snackbar";

import {
  getProductData,
  deleteProduct,
  getProductById,
} from "../../redux/action/publisher/spotAction";
import { hideAlert, showAlertCustom } from "../../redux/action/customAction";

const useStyles = (theme) => ({
  box: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: "70px",
  },
  spot: {
    marginLeft: 5,
    marginRight: 5,
  },
  hr: {
    border: 0,
    borderTop: "1px solid #1D3557",
    margin: "20px auto",
    marginTop: 10,
    textAlign: "center",
  },
});

class PublisherControl extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("isLogin")) {
      const isPublisher = localStorage.getItem("isPublisher");
      if (isPublisher === "false") {
        this.props.history.replace("/");
      }
      await this.props.getProductData();
    } else {
      this.props.history.push("/signin");
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.deleted) {
      await this.props.getProductData();
    }
  };

  // to redirect to add new spot
  handleButtonAddClick = () => {
    this.props.history.push("/dashboard/publisher/control/add");
  };

  // to handle delete spot
  deleteSpot = async (e) => {
    await this.props.deleteProduct(e);
  };

  // to handle edit spot
  handleEditClick = async (id) => {
    localStorage.setItem("id_spots", id);
    await this.props.getProductById(id);
    await this.props.history.push("/dashboard/publisher/control/edit/" + id);
  };

  render() {
    const { classes } = this.props;
    const spot = this.props.spots;
    return (
      <Fragment>
        <TopAppBarPublisher title={"Pengaturan Spot"} />
        <AlerSnackbar
          hideAlert={this.props.hideAlert}
          alert={this.props.alert}
        />
        <div className={classes.box}>
          <AddSpotButton handleButtonAddClick={this.handleButtonAddClick} />
          <hr className={classes.hr} />
          {spot.length === 0 ? (
            <div
              style={{
                marginTop: "30px",
                color: "#777",
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Anda belum menambahkan spot iklan
            </div>
          ) : (
            <Grid container spacing={0} style={{ marginTop: "-10vmin" }}>
              {spot.map((el, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <motion.div
                    className={classes.spot}
                    animate={{ y: "10vmin" }}
                    transition={{ ease: "easeOut", duration: 2 }}
                  >
                    <CardControlDashboardPublisher
                      id={el.id}
                      name={el.name}
                      price={el.price}
                      status={el.status}
                      isLoading={this.props.isLoading}
                      delSpot={(e) => this.deleteSpot(e)}
                      handleEditClick={(id) => this.handleEditClick(id)}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
        <div style={{ height: "25vmin" }} />
        <DashboardPublisherAppBar />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alert: state.custom.alert,
    spots: state.control.spots,
    deleted: state.control.deleted,
    isLoading: state.user.isLoading,
  };
};

const mapDispatchToProps = {
  getProductData,
  deleteProduct,
  getProductById,
  hideAlert,
  showAlertCustom,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(PublisherControl));
