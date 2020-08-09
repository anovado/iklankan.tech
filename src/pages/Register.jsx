import React from "react";
import { connect } from "react-redux";

import { RegisterFormFirst } from "../component/AdvertiserRegisterForm/RegisterFormFirst";
import { RegisterFormSecond } from "../component/AdvertiserRegisterForm/RegisterFormSecond";
import TopAppBarPublisher from "../component/TopAppBarDashboardPublisher";
import BottomAppBar from "../component/BottomAppBar";

import {
  saveRegisterFormData,
  showAlertCustom,
  hideAlert,
} from "../redux/action/customAction";
import { userRegister } from "../redux/action/userAction";

class Register extends React.Component {
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.saveRegisterFormData(e.target);
  };

  componentDidMount() {
    const regis = this.props.userIsRegister;

    if (regis === true) {
      this.props.showAlert("Register Berhasil", "success");
      this.props.history.replace("/signin");
    }
  }

  // to handle submitting data
  handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (e.target.email.value !== e.target.confirmEmail.value) {
      this.props.showAlertCustom("email tidak sama", "error");
    } else if (e.target.password.value !== e.target.confirmPassword.value) {
      this.props.showAlertCustom("password tidak sama", "error");
    } else {
      await this.props.userRegister(e.target);
      const isRegistered = this.props.userIsRegister;
      if (isRegistered) {
        await this.props.showAlertCustom("Register Berhasil", "success");
        this.props.history.replace("/signin");
      } else {
        await this.props.showAlertCustom("Register gagal!! ", "error");
      }
    }
  };

  render() {
    if (this.props.nextComp === true) {
      return (
        <React.Fragment>
          <TopAppBarPublisher title={"Register"} />
          <RegisterFormSecond
            handleRegisterSubmit={this.handleRegisterSubmit}
            saveRegisterFormData={this.props.saveRegisterFormData}
            hideAlert={this.props.hideAlert}
            alert={this.props.alert}
            isLoading={this.props.isLoading}
          />
          <div style={{ height: "20vmin" }} />
          <BottomAppBar />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <TopAppBarPublisher title={"Register"} />
          <RegisterFormFirst handleFormSubmit={this.handleFormSubmit} />
          <div style={{ height: "20vmin" }} />
          <BottomAppBar />
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userIsRegister: state.user.userIsRegister,
    isLoading: state.user.isLoading,
    nextComp: state.custom.nextComp,
    phoneNumber: state.custom.phoneNumber,
    fullName: state.custom.fullName,
    alert: state.custom.alert,
  };
};

const mapDispatchToProps = {
  userRegister,
  saveRegisterFormData,
  showAlertCustom,
  hideAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
