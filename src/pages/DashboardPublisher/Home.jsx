import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { motion } from "framer-motion";

import { CardDashboardPublisher } from "../../component/DashboardPublisherHome/Card";
import DashboardPublisherAppBar from "../../component/DashboardPublisherAppBar";
import TopAppBarPublisher from "../../component/TopAppBarDashboardPublisher";

import {
  publisherGetUserCart,
  approveCartPermission,
  declineCartPermission,
} from "../../redux/action/publisher/publisherAction";

const useStyles = (theme) => ({
  box: {
    marginLeft: "5vmin",
    marginRight: "5vmin",
    marginTop: "70px",
  },
  spot: {
    marginLeft: 5,
    marginRight: 5,
  },
  subtitle: {
    textAlign: "left",
    fontSize: "2vh",
    fontWeight: 500,
    color: "#191923",
  },
  hr: {
    border: 0,
    borderTop: "1px solid #1D3557",
    margin: "20px auto",
    marginTop: 10,
    textAlign: "center",
  },
});

class PublisherHome extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("isLogin")) {
      const isPublisher = localStorage.getItem("isPublisher");
      if (isPublisher === "false") {
        this.props.history.replace("/");
      }
      await this.props.publisherGetUserCart();
    } else {
      this.props.history.push("/signin");
    }
  };

  render() {
    const dataTransaksi = this.props.dataTransaksi;
    const { classes } = this.props;

    return (
      <Fragment>
        <TopAppBarPublisher title={"Dashboard Publisher"} />
        <div style={{ height: "1vmin" }} />
        <div className={classes.box}>
          <div className={classes.subtitle}>Permintaan sewa spot baru</div>
          <hr className={classes.hr} />
          {dataTransaksi.length === 0 ? (
            <div
              style={{
                marginTop: "30px",
                color: "#777",
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Belum ada permintaan sewa spot iklan
            </div>
          ) : (
            <Grid container spacing={0}>
              {dataTransaksi.map((el, i) =>
                el.spot_list.length === 0 ? (
                  <div
                    style={{
                      marginTop: "10px",
                      color: "#777",
                      textAlign: "center",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    key={i}
                  >
                    Belum ada permintaan sewa spot iklan
                  </div>
                ) : (
                  <Fragment key={i}>
                    {el.spot_list.map((elm, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <motion.div
                          className={classes.spot}
                          animate={{ y: "5vmin" }}
                          transition={{ ease: "easeOut", duration: 2 }}
                        >
                          <CardDashboardPublisher
                            dataSpot={elm}
                            approveCartPermission={
                              this.props.approveCartPermission
                            }
                            declineCartPermission={
                              this.props.declineCartPermission
                            }
                          />
                        </motion.div>
                      </Grid>
                    ))}
                  </Fragment>
                )
              )}
            </Grid>
          )}
        </div>
        <div style={{ height: "20vmin" }} />
        <DashboardPublisherAppBar />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataTransaksi: state.publisher.dataUSerCart,
  };
};

const mapDispatchToProps = {
  publisherGetUserCart,
  approveCartPermission,
  declineCartPermission,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(PublisherHome));
