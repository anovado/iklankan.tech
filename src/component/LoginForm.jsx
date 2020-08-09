import React from "react";
import { Link } from "react-router-dom";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { motion } from "framer-motion";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
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
    marginTop: "20vmin",
  },
  large: {
    width: "50vw",
    marginBottom: "10vmin",
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#FFFFFF",
    backgroundColor: "#1D3557",
    height: "3em",
    "&:hover": {
      backgroundColor: "#1D3557",
    },
  },
}))(Button);

const section = {
  marginTop: "auto",
  maginBottom: "auto",
  height: "100vh",
};

export const LoginForm = (props) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");

  // handle to close snackbar notification
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.hideAlert();
  };

  const style = useStyles();
  return (
    <div style={section}>
      <Snackbar
        open={props.alert.show}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert onClose={props.hideAlert} severity={props.alert.type}>
          {props.alert.message}
        </Alert>
      </Snackbar>
      <Box>
        <Grid container justify="center">
          <motion.div
            style={{
              marginTop: "70px",
              height: "30px",
            }}
            animate={{ y: "5vmin" }}
            transition={{ ease: "easeOut", duration: 2 }}
          >
            <img
              src={require("../assets/images/example_logo.png")}
              className={style.large}
              alt="logo"
            />
          </motion.div>
          <div>
            <form
              className={style.root}
              validate="true"
              autoComplete="off"
              onSubmit={(e) => props.userLogin(e)}
            >
              <TextField
                id="outlined-basic-phone"
                label="Phone Number"
                type="Text"
                variant="outlined"
                name="phoneNumber"
                value={phoneNumber}
                inputProps={{
                  pattern: "[0][8][0-9]{8,13}",
                  title:
                    "Nomor telpon hanya angka minimal 8 digit maksimal 14 digit dan diawali dengan 08",
                }}
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <TextField
                id="outlined-basic-password"
                label="Password"
                type="Password"
                variant="outlined"
                name="password"
                inputProps={{
                  pattern: "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}",
                  title:
                    "Password minimal 8 digit terdiri dari a-z, A-Z dan 0-9",
                }}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {props.isLoading ? (
                <div
                  style={{
                    display: "flex",
                    marginLeft: "68vmin",
                  }}
                >
                  <CircularProgress color="#1D3557" />
                </div>
              ) : (
                <ColorButton
                  variant="contained"
                  size="large"
                  type="submit"
                  // onClick={(e) => props.userLogin(userName, userPassword)}
                >
                  Masuk
                </ColorButton>
              )}
            </form>

            <p style={{ fontSize: "12px", color: "#191923" }}>
              Belum punya akun? Silakan daftar{" "}
              <Link to="/register">disini</Link>
            </p>
          </div>
        </Grid>
      </Box>
    </div>
  );
};
