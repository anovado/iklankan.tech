import React from "react";
import { connect } from "react-redux";

import TopAppBarAdmin from "../../component/TopAppBarAdmin";
import DashboardAdminAppBar from "../../component/DashboardAdminAppBar";
import { BoxSpotList } from "../../component/DashboardAdminSpot/BoxSpotList";
import {
  getSpotData,
  getSpotById,
  doDeleteSpot,
} from "../../redux/action/admin/spotAdminAction";
import { doLogOut } from "../../redux/action/userAction";

import { motion } from "framer-motion";
import CircularProgress from "@material-ui/core/CircularProgress";

class SpotRequest extends React.Component {
  componentDidMount = async () => {
    const status = localStorage.getItem("status");
    const login = localStorage.getItem("isLogin");

    // to prevent non admin to enter dashboard admin
    if (login) {
      if (status === "user") {
        await this.props.history.replace("/");
      }
      await this.props.getSpotData();
    } else {
      await this.props.history.push("/signin");
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.deleted) {
      await this.props.getSpotData();
    }
  };

  // to handle routing to spot details
  handleClick = async (id) => {
    await this.props.getSpotById(id);
    await this.props.history.push("/dashboard/admin/spot/" + id);
  };

  // to handle deleting the spot
  handleDelete = async (id) => {
    await this.props.doDeleteSpot(id);
  };

  render() {
    return (
      <React.Fragment>
        <TopAppBarAdmin title={"Data Spot"} />
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
          Daftar spot iklan yang tersedia
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
        ) : (
          this.props.spotList.map((el) => {
            return (
              <motion.div
                style={{ marginBottom: "12px" }}
                initial={{ y: "-2vmin" }}
                animate={{ y: "4vmin" }}
                transition={{ ease: "easeOut", duration: 2 }}
              >
                <BoxSpotList
                  spot={el}
                  handleClick={(id) => this.handleClick(id)}
                  handleDelete={(id) => this.handleDelete(id)}
                />
              </motion.div>
            );
          })
        )}
        <div style={{ height: "25vmin" }} />
        <DashboardAdminAppBar {...this.props} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    spotList: state.adminSpot.spotList,
    deleted: state.adminSpot.deleted,
    isLoading: state.user.isLoading,
  };
};

const mapDispatchToProps = {
  getSpotData,
  getSpotById,
  doDeleteSpot,
  doLogOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotRequest);
