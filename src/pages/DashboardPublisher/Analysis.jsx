import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { DashboardPublisherPanel } from "../../component/DashboardPublisherAnalysis/Panel";
import CardSummary from "../../component/DashboardPublisherAnalysis/CardSummary";
import DashboardPublisherAppBar from "../../component/DashboardPublisherAppBar";
import TopAppBarPublisher from "../../component/TopAppBarDashboardPublisher";
// import SimpleBackdrop from "../../component/SpotDetails/Loading.jsx";

import { getAllDataTransaction } from "../../redux/action/publisher/publisherAction";

const useStyles = (theme) => ({
  hr: {
    border: 0,
    borderTop: "1px solid #1D3557",
    margin: "20px auto",
    width: "89%",
    textAlign: "center",
  },
  expansion: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  label: {
    textAlign: "left",
    fontSize: "2vh",
    color: "#191923",
    marginBottom: 5,
  },
});

class PublisherAnalysis extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);

    if (localStorage.getItem("isLogin")) {
      const isPublisher = localStorage.getItem("isPublisher");
      if (isPublisher === "false") {
        this.props.history.replace("/");
      }
      await this.props.getAllDataTransaction();
    } else {
      this.props.history.push("/signin");
    }
  };

  render() {
    const { classes } = this.props;
    const income = this.props.dataTransaksi
      .filter((el) => el.midtrans_status.transaction_status === "settlement")
      .reduce((sum, value) => sum + value.total_price, 0);

    return (
      <Fragment>
        <TopAppBarPublisher title={"Analisis Pendapatan"} />
        <div style={{ height: "70px" }} />
        <CardSummary income={income} isLoading={this.props.isLoading} />
        {this.props.isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10vmin",
            }}
          >
            <CircularProgress color="#457b9d" />
          </div>
        ) : this.props.dataTransaksi.length === 0 ? (
          <div
            style={{
              marginTop: "30px",
              color: "#777",
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Belum ada titik iklan yang disewa
          </div>
        ) : (
          <div className={classes.expansion}>
            <div className={classes.label}>
              Riwayat transaksi atas spot anda
            </div>
            {this.props.dataTransaksi.map((el, index) => (
              <div style={{ marginBottom: "10px" }} key={index}>
                <DashboardPublisherPanel dataTrx={el} index={index} />
              </div>
            ))}
          </div>
        )}

        <div style={{ height: "25vmin" }} />
        <DashboardPublisherAppBar />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataTransaksi: state.publisher.dataTransaksi,
    isLoading: state.user.isLoading,
  };
};

const mapDispatchToProps = {
  getAllDataTransaction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(PublisherAnalysis));
