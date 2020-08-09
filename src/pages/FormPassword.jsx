import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import BottomAppBar from "../component/BottomAppBar";
import TopAppBar from "../component/TopAppBar";
import { withStyles } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import { editUserPassword, changeInputUser } from "../redux/action/userAction";
import { AlerSnackbar } from "../component/Snackbar/Snackbar";
import { hideAlert, showAlertCustom } from "../redux/action/customAction";

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
        //set soft dark input field
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
  buttonLogout: {
    width: "80vmin",
    marginTop: 20,
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
  subtitle: {
    fontSize: "1.3rem",
    fontWeight: 500,
    marginTop: 20,
    marginBottom: 10,
    color: "#191923",
  },
});

class FormPassword extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
  };

  // function to handle changing password
  editFormData = async () => {
    await this.props.editUserPassword();
    if (await this.props.statusError) {
      this.props.showAlertCustom(
        "Ganti password gagal, silakan coba lagi",
        "error"
      );
    } else {
      this.props.showAlertCustom(
        "Password anda telah berhasil dirubah",
        "success"
      );
      this.props.history.push("/profile");
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <TopAppBar title={"Halaman Edit Password"} />
        <AlerSnackbar
          hideAlert={this.props.hideAlert}
          alert={this.props.alert}
        />
        <Grid container direction="row" className={classes.rowData} spacing={0}>
          <Grid item xs={7} sm={7}>
            <div>
              <h3 className={classes.subtitle}>Edit Password</h3>
            </div>
          </Grid>
        </Grid>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <TextField
            label="Masukkan Password Baru"
            id="standard-size-small"
            name="password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            required
            onChange={(e) => this.props.changeInput(e)}
          />
          <TextField
            label="Konfirmasi Password Baru"
            id="standard-size-small"
            name="confirmPassword"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            required
            onChange={(e) => this.props.changeInput(e)}
          />
        </form>
        {this.props.isLoading ? (
          <div
            style={{
              display: "flex",
              // justifyContent: "center",
              marginLeft: "46vmin",
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
            onClick={() => this.editFormData()}
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
        <BottomAppBar />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alert: state.custom.alert,
    statusError: state.user.statusError,
    isLoading: state.user.isLoading,
  };
};

const mapDispatchToProps = {
  changeInput: (e) => changeInputUser(e),
  editUserPassword,
  hideAlert,
  showAlertCustom,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(FormPassword));
