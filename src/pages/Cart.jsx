import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import BottomAppBar from "../component/BottomAppBar";
import TopAppBar from "../component/TopAppBar";
import SpotInCart from "../component/transaction/SpotInCart";

import {
  getTransDetail,
  checkOut,
  getTokenFormTansactionID,
  setTransactionPaymentID,
  doDeleteCart,
} from "../redux/action/transactionAction";

const useStyles = (theme) => ({
  divider: {
    marginBottom: 0,
    marginTop: 0,
    border: 0,
    width: "100%",
    borderTop: "1px solid #eee",
    marginLeft: "auto",
    marginRight: "auto",
  },
  subtitle: {
    textAlign: "center",
    color: "#777",
    marginTop: 30,
    marginBottom: 10,
  },
  box: {
    marginLeft: "4vmin",
    marginRight: "4vmin",
    marginTop: "70px",
    paddingTop: 0,
  },
  button: {
    width: "90vmin",
    marginBottom: 25,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    color: "#fff",
    textDecoration: "none",
    backgroundColor: "#E63946",
    boxShadow: "0 1px 2px 1px rgba(0,0,0,0.4)",
    border: 0,
    borderRadius: 4,
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#E63946",
    },
  },
  subtotal: {
    // marginLeft: "auto",
    // marginRight: "auto",
    width: "90vmin",
  },
  totalRowFinal: {
    marginTop: 15,
    marginBottom: 5,
    width: "90vmin",
    listStyleType: "none",
    fontSize: "1.25rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    textTransform: "uppercase",
    color: "#777",
  },
  value: {
    letterSpacing: "-0.025em",
    marginLeft: 40,
  },
  subtitle2: {
    textAlign: "left",
    fontSize: "2vh",
    fontWeight: 500,
    color: "#191923",
    marginBottom: 10,
    paddingBottom: 0,
  },
  spot: {
    marginTop: 0,
  },
});

class Cart extends Component {
  constructor(props) {
    super(props);
    this.checkedOut = this.checkedOut.bind(this);
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("isLogin")) {
      await this.props.getTransDetail();
    } else {
      this.props.history.push("/signin");
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.deleted) {
      await this.props.getTransDetail();
    }
  };

  // delete data cart
  handleDeleteCart = async (id) => {
    await this.props.doDeleteCart(id);
  };

  // function to checkout spots in cart
  checkedOut = async (transID) => {
    await this.props.getTokenFormTansactionID(transID);
    const token = this.props.transToken;
    const setTrx = this.props.setTransactionPaymentID;
    const history = this.props.history;
    window.snap.pay(token, {
      onSuccess: async function (result) {
        await setTrx(transID, result.transaction_id, history);
      },
      onPending: async function (result) {
        await setTrx(transID, result.transaction_id, history);
      },
      onError: async function (result) {},
      onClose: async function () {
        console.log("customer closed the popup without finishing the payment");
      },
    });
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <TopAppBar title={"Keranjang Belanja"} />
        <div className={classes.box}>
          <div className={classes.subtitle2}>Daftar keranjang belanja</div>
          {this.props.data.length < 1 ? (
            <Fragment>
              <hr className={classes.divider} />
              <div className={classes.subtitle}>
                Anda belum menambahkan spot
              </div>
            </Fragment>
          ) : (
            <Grid container spacing={0}>
              {this.props.data.map((el, index) => {
                let harga = 0;
                return (
                  <Fragment key={index}>
                    {el.transaction_detail_diterima.length >= 1 ? (
                      <Fragment>
                        <div>
                          {el.transaction_detail_diterima.map((sub, i) => {
                            harga += sub.price;
                            return (
                              <Grid item xs={12} key={i}>
                                <hr className={classes.divider} />
                                <div className={classes.spot}>
                                  <SpotInCart
                                    name={sub.ads_spot.name}
                                    price={sub.price}
                                    starting_date={sub.starting_date}
                                    durations={sub.durations}
                                    image={sub.image.name}
                                    id={sub.id}
                                    handleDeleteCart={(id) =>
                                      this.handleDeleteCart(id)
                                    }
                                    status={sub.is_authorized}
                                  />
                                </div>
                                <hr className={classes.divider} />
                              </Grid>
                            );
                          })}
                        </div>
                        <div className={classes.subtotal}>
                          <hr className={classes.divider} />
                          <div className={classes.totalRowFinal}>
                            <div className={classes.label}>Total</div>
                            <div className={classes.value}>
                              Rp {harga.toLocaleString()}
                              ,-
                            </div>
                          </div>

                          <button
                            className={classes.button}
                            onClick={() => this.checkedOut(el.transaction.id)}
                          >
                            Checkout
                          </button>
                          <hr
                            className={classes.divider}
                            style={{ marginBottom: 3 }}
                          />
                        </div>
                      </Fragment>
                    ) : (
                      <Fragment>
                        {/* if no data transaction accepted is will be blank */}
                      </Fragment>
                    )}
                    {el.transaction_detail_ditolak.length >= 1 ? (
                      <Fragment>
                        <div>
                          {el.transaction_detail_ditolak.map((sub, i) => (
                            <Grid item xs={12} sm={12} key={i}>
                              <hr className={classes.divider} />
                              <div className={classes.spot}>
                                <SpotInCart
                                  name={sub.ads_spot.name}
                                  price={sub.price}
                                  starting_date={sub.starting_date}
                                  durations={sub.durations}
                                  image={sub.image.name}
                                  id={sub.id}
                                  handleDeleteCart={(id) =>
                                    this.handleDeleteCart(id)
                                  }
                                  status={sub.is_authorized}
                                />
                              </div>
                              <hr className={classes.divider} />
                            </Grid>
                          ))}
                        </div>
                      </Fragment>
                    ) : (
                      <Fragment>
                        {/* if no data transaction rejected is will be blank */}
                      </Fragment>
                    )}
                  </Fragment>
                );
              })}
            </Grid>
          )}
        </div>
        <div style={{ height: "25vmin" }} />
        <BottomAppBar />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.transaction.dataCart,
    transToken: state.transaction.transToken,
    deleted: state.transaction.deleted,
  };
};

const mapDispatchToProps = {
  getTransDetail,
  checkOut,
  getTokenFormTansactionID,
  setTransactionPaymentID,
  doDeleteCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(useStyles)(Cart)));
