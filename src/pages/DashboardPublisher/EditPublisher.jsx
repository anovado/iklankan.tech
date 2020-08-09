import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getPublisherData,
  editDataPublisher,
  doEditDataPublisherOne,
  doEditDataPublisherTwo,
} from "../../redux/action/publisher/publisherAction";

import DashboardPublisherAppBar from "../../component/DashboardPublisherAppBar";
import { EditPublisherFirst } from "../../component/DashPublisherEditProfile/PublisherEditFirst";
import { EditPublisherNext } from "../../component/DashPublisherEditProfile/PublisherEditNext";

class FormEditPublisher extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    const isPublisher = localStorage.getItem("isPublisher");
    if (isPublisher === "false") {
      this.props.history.replace("/");
    }
    await this.props.getPublisherData();
  };

  // handle to go back to the previous form
  backProfile = async () => {
    await this.props.history.replace("/dashboard/publisher/profile");
    await this.props.getPublisherData();
  };

  render() {
    if (this.props.nextFormComp === true) {
      return (
        <React.Fragment>
          <div>
            <EditPublisherNext
              doValidateFormRegisterPublisherTwo={
                this.props.doEditDataPublisherTwo
              }
              editDataPublisher={this.props.editDataPublisher}
              backProfile={this.backProfile}
              isLoading={this.props.isLoading}
              {...this.props}
            />
          </div>
          <DashboardPublisherAppBar />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div>
            <EditPublisherFirst
              doValidateFormRegisterPublisherOne={
                this.props.doEditDataPublisherOne
              }
              {...this.props}
            />
          </div>
          <DashboardPublisherAppBar />
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    nextFormComp: state.publisher.nextFormComp,
    publisherProfile: state.publisher.dataPublisher,
    isLoading: state.user.isLoading,
  };
};

const mapDispatchToProps = {
  getPublisherData,
  editDataPublisher,
  doEditDataPublisherOne,
  doEditDataPublisherTwo,
};
export default connect(mapStateToProps, mapDispatchToProps)(FormEditPublisher);
