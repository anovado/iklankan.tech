import React from "react";
import { connect } from "react-redux";

import { getUserData, doRegisterPublisher } from "../redux/action/userAction";
import {
  handleChange,
  handleFileChange,
  doValidateFormRegisterPublisherOne,
  doValidateFormRegisterPublisherTwo,
} from "../redux/action/customAction";

import { RegistePublisherFormFirst } from "../component/PublisherRegisterForm/RegistePublisherFormFirst";
import { RegistePublisherFormNext } from "../component/PublisherRegisterForm/RegistePublisherFormNext";
import BottomAppBar from "../component/BottomAppBar";
import TopAppBar from "../component/TopAppBar";

class RegisterPublisher extends React.Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);

    // to handle whether registration is successful or not
    if (localStorage.getItem("isLogin")) {
      if (localStorage.getItem("isPublisher") === "false") {
        await this.props.getUserData();
      } else {
        this.props.history.push("/dashboard/publisher/profile");
      }
    } else {
      this.props.history.push("/signin");
    }
  };

  render() {
    if (this.props.nextFormComp === true) {
      return (
        <React.Fragment>
          <TopAppBar title={"Daftar Publisher"} />
          <div style={{ height: "60px" }} />
          <RegistePublisherFormNext
            doRegisterPublisher={this.props.doRegisterPublisher}
            doValidateFormRegisterPublisherTwo={
              this.props.doValidateFormRegisterPublisherTwo
            }
            isLoading={this.props.isLoading}
          />
          <div style={{ height: "25vmin" }} />
          <BottomAppBar />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <TopAppBar title={"Daftar Publisher"} />
          <div style={{ height: "60px" }} />
          <RegistePublisherFormFirst
            handleChange={this.props.handleChange}
            handleFileChange={this.props.handleFileChange}
            doValidateFormRegisterPublisherOne={
              this.props.doValidateFormRegisterPublisherOne
            }
          />
          <div style={{ height: "25vmin" }} />
          <BottomAppBar />
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    nextFormComp: state.custom.nextFormComp,
    isLoading: state.user.isLoading,
  };
};

const mapDispatchToProps = {
  getUserData,
  handleChange,
  handleFileChange,
  doRegisterPublisher,
  doValidateFormRegisterPublisherOne,
  doValidateFormRegisterPublisherTwo,
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPublisher);
