import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";

import { UserListComp } from "../../component/DashboardAdminUser/UserListComp";
import { doLogOut } from "../../redux/action/userAction";
import DashboardAdminAppBar from "../../component/DashboardAdminAppBar";
import TopAppBarAdmin from "../../component/TopAppBarAdmin";
import {
  getUserForAdmin,
  doDeleteUser,
} from "../../redux/action/admin/userAdminAction";

import { motion } from "framer-motion";

class UserList extends Component {
  componentDidMount = async () => {
    const status = localStorage.getItem("status");
    if (status === "user") {
      this.props.history.replace("/");
    }
    await this.props.getUserForAdmin();
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.deleted) {
      await this.props.getUserForAdmin();
    }
  };

  deleteUser = async (id) => {
    await this.props.doDeleteUser(id);
  };
  render() {
    return (
      <Fragment>
        <TopAppBarAdmin title={"Daftar User"} />

        <div style={{ height: "70px" }} />
        <div
          style={{
            textAlign: "left",
            fontSize: "2vh",
            fontWeight: 500,
            color: "#191923",
            marginLeft: 15,
          }}
        >
          Daftar user yang terdaftar
        </div>
        {this.props.isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10vmin",
              color: "#457b9d",
            }}
          >
            <CircularProgress color="#457b9d" />
          </div>
        ) : (
          this.props.userList.map((el) => {
            return (
              <motion.div
                style={{ marginBottom: "12px" }}
                initial={{ y: "-2vmin" }}
                animate={{ y: "4vmin" }}
                transition={{ ease: "easeOut", duration: 2 }}
              >
                <UserListComp user={el} delUser={(id) => this.deleteUser(id)} />
              </motion.div>
            );
          })
        )}
        <div style={{ height: "25vmin" }} />
        <DashboardAdminAppBar {...this.props} />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userList: state.adminUser.userList,
    deleted: state.adminUser.deleted,
    isLoading: state.user.isLoading,
  };
};

const mapDispatchToProps = {
  getUserForAdmin,
  doDeleteUser,
  doLogOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
