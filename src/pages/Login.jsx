import React, { Fragment } from "react";
import { connect } from "react-redux";

import { LoginForm } from "../component/LoginForm";
import BottomAppBar from "../component/BottomAppBar";
import TopAppBarPublisher from "../component/TopAppBarDashboardPublisher";

import { userLogin } from "../redux/action/userAction";
import { hideAlert, showAlertCustom } from "../redux/action/customAction";

class Login extends React.Component {
  // funtion to handle user login
  doLogin = async (e) => {
    e.preventDefault();
    const phone = e.target.phoneNumber.value;
    const password = e.target.password.value;
    await this.props.userLogin(phone, password);

    // to handle which page to redirect based on status user or admin
    const loginStatus = this.props.isLogin;
    if (loginStatus === true) {
      const status = localStorage.getItem("status");
      if (status === "admin") {
        this.props.showAlertCustom("Login Berhasil!", "success");
        this.props.history.replace("/dashboard/admin");
      } else {
        this.props.showAlertCustom("Login Berhasil!", "success");
        this.props.history.replace("/");
      }
    } else {
      this.props.showAlertCustom("Login gagal!", "error");
    }
  };

  render() {
    return (
      <Fragment>
        <TopAppBarPublisher title={"Sign in"} />
        <LoginForm
          userLogin={this.doLogin}
          alert={this.props.alert}
          hideAlert={this.props.hideAlert}
          isLoading={this.props.isLoading}
        />
        <BottomAppBar />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    isLoading: state.user.isLoading,
    alert: state.custom.alert,
  };
};

const mapDispatchToProps = {
  userLogin,
  hideAlert,
  showAlertCustom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
