import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "../assets/css/Profile.css";

import BottomAppBar from "../component/BottomAppBar";
import ProfileComponent from "../component/UserProfile/ProfileComponent";
import TopAppBar from "../component/TopAppBar";
import { AlerSnackbar } from "../component/Snackbar/Snackbar";

import { getUserData, doLogOut } from "../redux/action/userAction";
import { hideAlert, showAlertCustom } from "../redux/action/customAction";

class ProfilePage extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    const status = localStorage.getItem("status");
    if (localStorage.getItem("isLogin")) {
      if (status === "admin") {
        this.props.history.replace("/dashboard/admin/user");
      } else {
        await this.props.getUserData();
      }
    } else {
      this.props.history.push("/signin");
    }
  };

  render() {
    return (
      <Fragment>
        <TopAppBar title={"Halaman Profil"} />

        <AlerSnackbar
          hideAlert={this.props.hideAlert}
          alert={this.props.alert}
        />
        <div style={{ height: "60px" }} />
        <ProfileComponent {...this.props} />
        <div style={{ height: "20vmin" }} />
        <BottomAppBar />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alert: state.custom.alert,
    profile: state.user.profile,
    isLoading: state.user.isLoading,
  };
};

const mapDispatchToProps = {
  getUserData,
  doLogOut,
  hideAlert,
  showAlertCustom,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
