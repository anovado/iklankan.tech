import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";

import { HistoryUserComp } from "../../component/History/HistoryUserComp";
import BottomAppBar from "../../component/BottomAppBar";
import TopAppBar from "../../component/TopAppBar";
import SimpleBackdrop from "../../component/SpotDetails/Loading";

import { getDataTransactions } from "../../redux/action/transactionAction";

class HistoryUser extends Component {
  componentDidMount = async () => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      this.props.history.replace("/signin");
    }
    await this.props.getDataTransactions();
  };

  render() {
    if (!this.props.dataTransaction) {
      return <SimpleBackdrop />;
    } else {
      return (
        <Fragment>
          <TopAppBar title={"Riwayat Transaksi"} />
          <div style={{ height: "70px" }} />
          <div
            style={{
              textAlign: "left",
              fontSize: "2vh",
              fontWeight: 500,
              color: "#191923",
              marginLeft: "4vmin",
              marginBottom: 10,
            }}
          >
            Daftar Riwayat Transaksi Anda
          </div>
          <hr
            style={{
              marginBottom: 0,
              marginTop: 0,
              marginLeft: "4vmin",
              marginRight: "4vmin",
              border: 0,
              borderTop: "1px solid #eee",
            }}
          />
          {this.props.isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10vmin",
                color: "#14273E",
              }}
            >
              <CircularProgress color="#14273E" />
            </div>
          ) : this.props.dataTransaction === undefined ||
            this.props.dataTransaction.length !== 0 ? (
            <div style={{ marginTop: "20px" }}>
              {this.props.dataTransaction.map((el, index) => {
                return (
                  <div style={{ marginBottom: "10px" }} key={index}>
                    <HistoryUserComp dataTransaksi={el} index={index} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ marginTop: "30px", color: "#777" }}>
              Belum ada riwayat transaksi
            </div>
          )}

          <div style={{ height: "70px" }} />
          <BottomAppBar />
        </Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    dataTransaction: state.transaction.dataTransaction,
    isLoading: state.user.isLoading,
  };
};

const mapDispatchToProps = {
  getDataTransactions,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryUser);
