import React, { Component, Fragment } from "react";
import "../../assets/css/Profile.css";
import { connect } from "react-redux";
import {
  getPublisherById,
  doAuthorizedPublisher,
  getPublisherRequest,
  getPublisherList,
  doDeletePublisher,
} from "../../redux/action/admin/publisherAdminAction";

import { doChangeIsPublisher } from "../../redux/action/admin/userAdminAction";
import { doLogOut } from "../../redux/action/userAction";

import DashboardAdminAppBar from "../../component/DashboardAdminAppBar";
import PublisherDetail from "../../component/DashboardAdminPublisher/PublisherDetail";
import TopAppBarAdmin from "../../component/TopAppBarAdmin";

class NewPublisher extends Component {
  componentDidMount = async () => {
    const id = localStorage.getItem("id_publisher");
    const status = localStorage.getItem("status");
    const login = localStorage.getItem("isLogin");
    if (login) {
      if (status === "user") {
        await this.props.history.replace("/");
      }
      await this.props.getPublisherById(id);
    } else {
      await this.props.history.push("/signin");
    }
  };

  handleEdit = async (id) => {
    await this.props.doAuthorizedPublisher(id);
    await this.props.getPublisherRequest();
    await this.props.getPublisherList();
    await this.props.history.replace("/dashboard/admin/publisher");
  };

  handleReject = async (id, user_id) => {
    await this.props.doDeletePublisher(id);
    await this.props.doChangeIsPublisher(user_id);
    await this.props.getPublisherRequest();
    await this.props.getPublisherList();
    await this.props.history.replace("/dashboard/admin/publisher");
  };

  render() {
    return (
      <Fragment>
        <TopAppBarAdmin title={"Profil Publisher"} />
        <div style={{ height: "70px" }} />
        <PublisherDetail
          handleEdit={(id) => this.handleEdit(id)}
          handleReject={(id, user_id) => this.handleReject(id, user_id)}
          {...this.props}
        />
        <div style={{ height: "20vmin" }} />
        <DashboardAdminAppBar {...this.props} />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    publisherById: state.adminPublisher.publisherById,
  };
};

const mapDispatchToProps = {
  getPublisherById,
  doAuthorizedPublisher,
  getPublisherRequest,
  getPublisherList,
  doDeletePublisher,
  doChangeIsPublisher,
  doLogOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPublisher);
