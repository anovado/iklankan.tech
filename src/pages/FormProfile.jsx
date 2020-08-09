import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import BottomAppBar from "../component/BottomAppBar";
import TopAppBar from "../component/TopAppBar";
import { AlerSnackbar } from "../component/Snackbar/Snackbar";

import { hideAlert, showAlertCustom } from "../redux/action/customAction";
import {
  editUserData,
  changeInputUser,
  getUserData,
} from "../redux/action/userAction";

const useStyles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "80%",
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
  rowData: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "25vmin",
  },
  button: {
    width: "80%",
    marginTop: 20,
    marginLeft: 3,
    marginRight: 3,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#457b9d",
    "&:hover": {
      backgroundColor: "#457b9d",
    },
  },
  photoDiv: {
    width: "47vmin",
  },
  labelBrowse: {
    textAlign: "left",
    marginLeft: "10vmin",
    fontSize: "12px",
    marginTop: 8,
    marginBottom: "0",
    color: "#457b9d",
  },
  buttonLogout: {
    width: "80vmin",
    marginBottom: 20,
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

class FormProfile extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    this.props.getUserData();
  };

  // to handle edit user data and show notification
  editFormData = async (e) => {
    e.preventDefault();
    await this.props.editUserData(e.target);
    if (await this.props.statusError) {
      this.props.showAlertCustom(
        "Pendaftaran anda gagal, silakan coba lagi",
        "error"
      );
    } else {
      this.props.showAlertCustom("Anda telah berhasil mendaftar", "success");
      this.props.history.push("/profile");
    }
  };

  render() {
    const { classes } = this.props;
    const profile = this.props.profile;
    return (
      <Fragment>
        <TopAppBar title={"Halaman Edit Profil"} />
        <AlerSnackbar
          hideAlert={this.props.hideAlert}
          alert={this.props.alert}
        />
        {this.props.profile.profil_pict ? (
          <Grid
            container
            direction="row"
            className={classes.rowData}
            spacing={0}
          >
            <Grid item xs={7} sm={7}>
              <div>
                <img
                  className={classes.photoDiv}
                  src={this.props.profile.profil_pict}
                  alt="profile"
                />
              </div>
            </Grid>
          </Grid>
        ) : (
          <div style={{ height: "25vmin" }} />
        )}
        <form
          className={classes.root}
          validate
          autoComplete="off"
          method="POST"
          onSubmit={(e) => this.editFormData(e)}
        >
          <TextField
            label="Nama"
            id="standard-size-small"
            defaultValue={profile.name}
            name="name"
            variant="outlined"
          />
          <TextField
            label="Alamat"
            id="standard-size-small"
            name="address"
            defaultValue={profile.address}
            variant="outlined"
            onChange={(e) => this.props.changeInput(e)}
          />
          <TextField
            label="Nomor Induk KTP"
            id="standard-size-small"
            name="KTP_number"
            defaultValue={profile.KTP_number}
            variant="outlined"
            onChange={(e) => this.props.changeInput(e)}
          />
          <div className={classes.labelBrowse}>Upload Foto Profil</div>
          <TextField
            id="outlined-basic"
            label=""
            variant="outlined"
            type="File"
            name="profil_pict"
          />

          <div className={classes.labelBrowse}>Upload Foto KTP</div>
          <TextField
            id="outlined-basic"
            label=""
            variant="outlined"
            type="File"
            name="KTP_pict"
          />
          {this.props.isLoading ? (
            <div
              style={{
                display: "flex",
                // justifyContent: "center",
                marginLeft: "46vmin",
                color: "#457b9d",
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
            >
              Submit
            </Button>
          )}

          <Button
            component={Link}
            to="/profile"
            variant="contained"
            className={classes.buttonLogout}
            type="button"
          >
            Cancel
          </Button>
        </form>
        <div style={{ height: "20vmin" }} />
        <BottomAppBar />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alert: state.custom.alert,
    name: state.user.name,
    address: state.user.address,
    profil_pict: state.user.profil_pict,
    ktp_number: state.user.ktp_number,
    ktp_pict: state.user.ktp_pict,
    statusError: state.user.statusError,
    profile: state.user.profile,
    isLoading: state.user.isLoading,
  };
};

const mapDispatchToProps = {
  changeInput: (e) => changeInputUser(e),
  getUserData,
  editUserData,
  hideAlert,
  showAlertCustom,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(FormProfile));
