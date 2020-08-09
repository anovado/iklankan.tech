import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { PublisherRequestComp } from "../../component/DashboardAdminPublisher/PublisherRequestComp";
import DashboardAdminAppBar from "../../component/DashboardAdminAppBar";
import TopAppBarAdmin from "../../component/TopAppBarAdmin";
import {
  getPublisherList,
  getPublisherRequest,
  getPublisherById,
  doDeletePublisher,
} from "../../redux/action/admin/publisherAdminAction";
import { doChangeIsPublisher } from "../../redux/action/admin/userAdminAction";
import { doLogOut } from "../../redux/action/userAction";

import CircularProgress from "@material-ui/core/CircularProgress";
import { motion } from "framer-motion";

class PublisherRequest extends Component {
  componentDidMount = async () => {
    const status = localStorage.getItem("status");
    const login = localStorage.getItem("isLogin");
    if (login) {
      if (status === "user") {
        await this.props.history.replace("/");
      }
      await this.props.getPublisherRequest();
      await this.props.getPublisherList();
    } else {
      await this.props.history.push("/signin");
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.deleted) {
      await this.props.getPublisherRequest();
      await this.props.getPublisherList();
    }
  };

  handleClickId = async (id) => {
    localStorage.setItem("id_publisher", id);
    await this.props.getPublisherById(id);
    await this.props.history.push("/dashboard/admin/publisher/" + id);
  };

  handleDelete = async (id, user_id) => {
    await this.props.doChangeIsPublisher(user_id);
    await this.props.doDeletePublisher(id);
  };
  render() {
    return (
      <Fragment>
        <TopAppBarAdmin title={"Daftar Publisher"} />
        <div style={{ height: "70px" }} />
        <div
          style={{
            textAlign: "left",
            fontSize: "2.2vh",
            fontWeight: 500,
            color: "#191923",
            marginLeft: 15,
          }}
        >
          Daftar Permintaan Publisher Baru
        </div>
        {this.props.isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10vmin",
              color: "#457B9D",
            }}
          >
            <CircularProgress color="#457B9D" />
          </div>
        ) : this.props.publisherRequest.length === 0 ? (
          <div style={{ marginTop: "30px", color: "#777" }}>
            Tidak ada Permintaan
          </div>
        ) : (
          <div>
            {this.props.publisherRequest.map((el) => {
              return (
                <motion.div
                  style={{ marginBottom: "12px" }}
                  initial={{ y: "-2vmin" }}
                  animate={{ y: "4vmin" }}
                  transition={{ ease: "easeOut", duration: 2 }}
                >
                  <PublisherRequestComp
                    publisher={el}
                    handleClickId={(id) => this.handleClickId(id)}
                    handleDelete={(id, user_id) =>
                      this.handleDelete(id, user_id)
                    }
                  />
                </motion.div>
              );
            })}
          </div>
        )}

        <div style={{ height: "15vmin" }} />
        <div
          style={{
            textAlign: "left",
            fontSize: "2.2vh",
            fontWeight: 500,
            color: "#191923",
            marginLeft: 15,
          }}
        >
          Daftar publisher terdaftar
        </div>

        {this.props.isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5vmin",
              color: "#457B9D",
            }}
          >
            <CircularProgress color="#457B9D" />
          </div>
        ) : this.props.publisherList.length !== 0 ? (
          <div>
            {this.props.publisherList.map((el) => {
              return (
                <motion.div
                  style={{ marginBottom: "12px" }}
                  initial={{ y: "-2vmin" }}
                  animate={{ y: "4vmin" }}
                  transition={{ ease: "easeOut", duration: 2 }}
                >
                  <PublisherRequestComp
                    publisher={el}
                    handleClickId={(id) => this.handleClickId(id)}
                    handleDelete={(id, user_id) =>
                      this.handleDelete(id, user_id)
                    }
                  />
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div style={{ marginTop: "30px", color: "#777" }}>
            Tidak ada publisher terdaftar
          </div>
        )}

        <div style={{ height: "25vmin" }} />
        <DashboardAdminAppBar {...this.props} />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    publisherList: state.adminPublisher.publisherList,
    publisherRequest: state.adminPublisher.publisherRequest,
    isLoading: state.user.isLoading,
    deleted: state.adminPublisher.deleted,
  };
};

const mapDispatchToProps = {
  getPublisherList,
  getPublisherRequest,
  getPublisherById,
  doDeletePublisher,
  doChangeIsPublisher,
  doLogOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(PublisherRequest);
