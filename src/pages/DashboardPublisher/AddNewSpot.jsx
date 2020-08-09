import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";
import { getProductData } from "../../redux/action/publisher/spotAction";

import DashboardPublisherAppBar from "../../component/DashboardPublisherAppBar";
import { AddSpotForm } from "../../component/PublisherControlSpot/PublisherControlSpotAdd";
import { AlerSnackbar } from "../../component/Snackbar/Snackbar";
import TopAppBarPublisher from "../../component/TopAppBarDashboardPublisher";

import {
  addNewProduct,
  getAllCategory,
} from "../../redux/action/publisher/spotAction";
import { hideAlert, showAlertCustom } from "../../redux/action/customAction";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    maxHeight: "30vmin",
  },
  mainTitle: {
    padding: 10,
    backgroundColor: "#1d3557",
    borderRadius: 8,
    marginLeft: 20,
    marginRight: 20,
    color: "#f1faee",
    fontWeight: 600,
  },
});

class PublisherControlAddSpot extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    const isPublisher = localStorage.getItem("isPublisher");
    this.props.getAllCategory();

    // to prevent non publisher to enter dashboard
    if (isPublisher === "false") {
      this.props.history.replace("/");
    }
    if (this.props.alert.type === "success") {
      this.props.history.push("/dashboard/publisher/control");
    }
  }

  backProfile = async () => {
    await this.props.getProductData();
    await this.props.history.replace("/dashboard/publisher/control");
  };

  render() {
    return (
      <Fragment>
        <AlerSnackbar
          hideAlert={this.props.hideAlert}
          alert={this.props.alert}
        />
        <TopAppBarPublisher title={"Tambah Spot"} />
        <div style={{ marginTop: "70px" }}>
          <AddSpotForm
            back={this.backProfile}
            allCategories={this.props.allCategories}
            addNewProduct={this.props.addNewProduct}
            isLoading={this.props.isLoading}
          />
        </div>

        <DashboardPublisherAppBar />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alert: state.custom.alert,
    allCategories: state.control.allCategories,
    isLoading: state.user.isLoading,
  };
};

const mapDispatchToProps = {
  addNewProduct,
  hideAlert,
  showAlertCustom,
  getAllCategory,
  getProductData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(PublisherControlAddSpot));
