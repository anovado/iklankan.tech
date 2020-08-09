import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import BottomAppBar from "../../component/BottomAppBar";
import DateSelector from "../../component/transaction/DateSelector";
import TopAppBar from "../../component/TopAppBar";

import { hideAlert, showAlertCustom } from "../../redux/action/customAction";
import { getProductById } from "../../redux/action/publisher/spotAction";
import {
  getSelectedDate,
  getDuration,
  postTransaction,
  changeInput,
} from "../../redux/action/transactionAction";

const useStyles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "80vmin",
    },
    "& label.Mui-focused": {
      color: "#1D3557",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1D3557",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#A6A2A0",
      },
      "&:hover fieldset": {
        borderColor: "#1D3557",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1D3557",
      },
    },
    marginTop: "5vmin",
  },
  divider: {
    marginBottom: 0,
    marginTop: 0,
    border: 0,
    borderTop: "1px solid #eee",
    marginLeft: "auto",
    marginRight: "auto",
  },
  subtitle: {
    textAlign: "left",
    fontSize: "2vh",
    fontWeight: 500,
    color: "#191923",
    marginLeft: 5,
    marginBottom: 10,
  },
  box: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: "70px",
  },
  button: {
    width: "80vmin",
    marginTop: 20,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#457b9d",
    "&:hover": {
      backgroundColor: "#457b9d",
    },
  },
  buttonLogout: {
    width: "80vmin",
    marginBottom: 20,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 5,
    paddingRight: 5,
    color: "#fff",
    textDecoration: "none",
    backgroundColor: "#E63946",
    "&:hover": {
      backgroundColor: "#E63946",
    },
  },
});

class PostTransaction extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("isLogin")) {
      const id = localStorage.getItem("id");
      this.props.getProductById(id);
    } else {
      this.props.history.push("/signin");
    }
  };

  // local state to get duration
  state = {
    index: this.props.duration - 1,
  };

  // to handle change price
  changePrice = (n) => {
    this.setState({ index: n });
    this.props.getDuration(n + 1);
  };

  // to handle add spot to cart
  postTrans = async (e) => {
    e.preventDefault();
    await this.props.postTransaction();

    this.props.statusError
      ? this.props.showAlertCustom(
          "Spot belum berhasil ditambahkan ke keranjang belanja, silakan coba lagi.",
          "error"
        )
      : this.props.history.push("/cart");
  };

  render() {
    const { classes } = this.props;
    const url = `spot/${localStorage.getItem("id")}`;

    let dates;
    if (this.props.date === "") {
      dates = new Date();
    } else {
      dates = this.props.date;
    }
    const duration = this.props.duration;
    const spot = this.props.spotsId;

    return (
      <Fragment>
        <TopAppBar title={"Halaman Transaksi"} />

        <div className={classes.box}>
          <div className={classes.subtitle}>Masukkan Detail Transaksi</div>
          <hr className={classes.divider} />
          <DateSelector
            price={this.props.price[this.state.index]}
            index={this.state.index}
            name={spot.name}
            image={this.props.images}
            date={dates}
            duration={duration}
            changePrice={(n) => this.changePrice(n)}
            getDates={(e) => this.props.getSelectedDate(e)}
          />

          <form
            className={classes.root}
            validate
            autoComplete="off"
            method="POST"
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              label="Keperluan sewa"
              id="standard-size"
              multiline
              rows={3}
              fullWidth
              name="purpose"
              variant="outlined"
              style={{ zIndex: 0 }}
              onChange={(e) => this.props.changeInput(e)}
              required
            />
            <TextField
              label="Masukkan pesan iklan anda"
              id="standard-"
              multiline
              rows={3}
              fullWidth
              name="add_text"
              variant="outlined"
              style={{ zIndex: 0 }}
              onChange={(e) => this.props.changeInput(e)}
              required
            />
            <TextField
              label="Link design banner"
              id="standard-sizes"
              name="design"
              variant="outlined"
              style={{ zIndex: 0 }}
              onChange={(e) => this.props.changeInput(e)}
              required
            />
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
            ) : (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
                value={spot.id}
                onClick={(e) => this.postTrans(e)}
              >
                Submit
              </Button>
            )}
            <Button
              component={Link}
              to={url}
              variant="contained"
              className={classes.buttonLogout}
              type="button"
            >
              Cancel
            </Button>
          </form>
        </div>

        <div style={{ height: "25vmin" }} />
        <BottomAppBar />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    spotsId: state.control.spotsId,
    images: state.control.images,
    price: state.control.price,
    date: state.transaction.date,
    duration: state.transaction.duration,
    statusError: state.transaction.statusError,
    isLoading: state.user.isLoading,
    alert: state.custom.alert,
  };
};

const mapDispatchToProps = {
  getProductById,
  getSelectedDate,
  getDuration,
  postTransaction,
  changeInput,
  hideAlert,
  showAlertCustom,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(PostTransaction));
