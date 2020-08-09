import React from "react";
import { Link } from "react-router-dom";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
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

export const RegisterFormFirst = (props) => {
  const style = useStyles();
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [userFullName, setUserFullName] = React.useState("");
  return (
    <div style={section}>
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
              onSubmit={(e) => props.handleFormSubmit(e)}
            >
              <TextField
                id="outlined-basic"
                label="Nomor Telepon"
                variant="outlined"
                type="Text"
                inputProps={{
                  pattern: "[0][8][0-9]{6,13}",
                  title:
                    "Nomor telpon hanya angka minimal 8 digit maksimal 14 digit dan diawali dengan 08",
                }}
                value={phoneNumber}
                name="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <TextField
                id="outlined-basic"
                label="Nama Lengkap"
                type="Text"
                variant="outlined"
                name="userFullName"
                value={userFullName}
                inputProps={{
                  pattern: "([a-zA-Z//\\s]){4,100}",
                  title: "Data hanya huruf dan spasi dan minimal 4 digit",
                }}
                onChange={(e) => setUserFullName(e.target.value)}
                required
              />
              <ColorButton variant="contained" size="large" type="submit">
                Next
              </ColorButton>
            </form>
            <p style={{ fontSize: "12px", color: "#191923" }}>
              Sudah punya akun? Silakan login <Link to="/signin">disini</Link>
            </p>
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
              style={{ width: "10%" }}
              aria-valuenow="10"
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
