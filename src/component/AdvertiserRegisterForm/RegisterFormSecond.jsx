import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import { motion } from "framer-motion";

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const RegisterFormSecond = (props) => {
  const [email, setEmail] = React.useState("");
  const [confirmEmail, setConfirmEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

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
              marginTop: "65px",
            }}
            animate={{ y: "5vmin" }}
            transition={{ ease: "easeOut", duration: 2 }}
          >
            <img
              src={require("../../assets/images/example_logo.png")}
              className={style.large}
              alt="logo"
            />
          </motion.div>
          <div>
            <form
              className={style.root}
              validate="true"
              autoComplete="off"
              method="POST"
              onSubmit={(e) => props.handleRegisterSubmit(e)}
            >
              <TextField
                id="outlined-basic1"
                label="Email"
                variant="outlined"
                type="Email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                id="outlined-basic2"
                label="Konfirmasi Email"
                variant="outlined"
                type="Email"
                value={confirmEmail}
                name="confirmEmail"
                onChange={(e) => setConfirmEmail(e.target.value)}
                required
              />
              <TextField
                id="outlined-password-input1"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                value={password}
                name="password"
                inputProps={{
                  pattern: "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}",
                  title:
                    "Password minimal 8 digit terdiri dari a-z, A-Z dan 0-9",
                }}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <TextField
                id="outlined-password-input2"
                label="Konfirmasi Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                name="confirmPassword"
                inputProps={{
                  pattern: "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}",
                  title:
                    "Password minimal 8 digit terdiri dari a-z, A-Z dan 0-9",
                }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
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
                  // onClick={props.doRegister}
                >
                  Register
                </ColorButton>
              )}
            </form>
          </div>
          <div
            class="progress"
            style={{
              height: "1px",
              color: "#1D3557",
              width: "80vmin",
              marginTop: 50,
            }}
          >
            <div
              class="progress-bar"
              role="progressbar"
              style={{ width: "60%" }}
              aria-valuenow="60"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </Grid>
      </Box>
    </div>
  );
};

// export default LoginForm;
