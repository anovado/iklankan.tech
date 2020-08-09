import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";

import { EditAddSpotForm } from "../../component/PublisherControlSpot/EditAdsSpot";
import TopAppBarPublisher from "../../component/TopAppBarDashboardPublisher";
import DashboardPublisherAppBar from "../../component/DashboardPublisherAppBar";

import {
  getProductById,
  doEditAdsSpot,
  getAllCategory,
  getCategoryById,
} from "../../redux/action/publisher/spotAction";

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

class EditAdsPublisher extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    const idSpot = localStorage.getItem("id_spots");
    const login = localStorage.getItem("isLogin");
    const isPublisher = localStorage.getItem("isPublisher");

    if (login) {
      if (isPublisher === "false") {
        await this.props.history.replace("/");
      }
      await this.props.getProductById(idSpot);
      this.props.getAllCategory();
    } else {
      await this.props.history.replace("/signin");
    }
  };

  render() {
    const dataSpotById = this.props.spotById
    return (
      <Fragment>
        <TopAppBarPublisher title={"Edit Ads Spot"} />
        <EditAddSpotForm
          spotById={dataSpotById}
          lat={dataSpotById.latitude}
          long={dataSpotById.longitude}
          doEditAdsSpot={(id, e) => this.props.doEditAdsSpot(id, e)}
          {...this.props}
        />
        <DashboardPublisherAppBar />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    spotById: state.control.spotsId,
    category: state.control.category,
    images: state.control.images,
    allCategories: state.control.allCategories,
  };
};

const mapDispatchToProps = {
  EditAddSpotForm,
  getProductById,
  doEditAdsSpot,
  getAllCategory,
  getCategoryById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(EditAdsPublisher));
