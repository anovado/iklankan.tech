import React, { Component, Fragment } from "react";
import "../../assets/css/Profile.css";
import { connect } from "react-redux";

import {
  getPublisherData,
  doDeletePublisher,
  doEditIsPublisher,
} from "../../redux/action/publisher/publisherAction";

import DashboardPublisherAppBar from "../../component/DashboardPublisherAppBar";
import PublisherProfileComp from "../../component/DashPublisherEditProfile/PublisherProfil";
import TopAppBarPublisher from "../../component/TopAppBarDashboardPublisher";

class PublisherProfile extends Component {
  componentDidMount = async () => {
    // to prevent non publisher to enter dashboard publisher
    if (localStorage.getItem("isLogin")) {
      const isPublisher = localStorage.getItem("isPublisher");
      if (isPublisher === "false") {
        this.props.history.replace("/");
      }
      await this.props.getPublisherData();
      console.log(this.props.dataTransaksi);
    } else {
      this.props.history.push("/signin");
    }
  };

  render() {
    return (
      <Fragment>
        <TopAppBarPublisher title={"Profil Publisher"} />
        <div style={{ height: "70px" }} />
        <PublisherProfileComp {...this.props} />
        <div style={{ height: "20vmin" }} />
        <DashboardPublisherAppBar />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    publisherProfile: state.publisher.dataPublisher,
    isLoading: state.user.isLoading,
  };
};

const mapDispatchToProps = {
  getPublisherData,
  doDeletePublisher,
  doEditIsPublisher,
};

export default connect(mapStateToProps, mapDispatchToProps)(PublisherProfile);
