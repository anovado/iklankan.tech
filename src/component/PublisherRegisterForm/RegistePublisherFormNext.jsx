import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "80vmin",
    },
    "& label.Mui-focused": {
      color: "#457B9D",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#457B9D",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        //set soft dark input field
        borderColor: "#A6A2A0",
      },
      "&:hover fieldset": {
        borderColor: "#457B9D",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#457B9D",
      },
    },
  },
  large: {
    width: "50vw",
    marginBottom: "10vmin",
  },
  gridMargin: {
    marginTop: "0",
  },
  labelBrowse: {
    textAlign: "left",
    marginLeft: "10vmin",
    fontSize: "12px",
    marginTop: 8,
    marginBottom: "0",
    color: "#457B9D",
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#FFFFFF",
    backgroundColor: "#457B9D",
    height: "3em",
    "&:hover": {
      backgroundColor: "#457B9D",
    },
  },
}))(Button);

const section = {
  marginTop: "auto",
  maginBottom: "auto",
  height: "100vh",
};

export const RegistePublisherFormNext = (props) => {
  const style = useStyles();
  const handleSubmit = (event) => {
    event.preventDefault();
    props.doValidateFormRegisterPublisherTwo(event.target);
    props.doRegisterPublisher();
  };

  return (
    <div style={section}>
      <Box>
        <Grid container justify="center">
          <motion.div
            style={{
              marginTop: "10px",
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
              validate
              autoComplete="off"
              method="POST"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className={style.labelBrowse}>Upload Foto Bisnis Anda</div>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                title="File tidak boleh kosong"
                type="File"
                name="publisher_pict"
                required
              />
              <TextField
                id="outlined-basic"
                label="Nama Akun Bank Publisher"
                variant="outlined"
                type="Text"
                name="bank_account_name"
                title="Data tidak boleh kosong"
                required
              />
              <TextField
                id="outlined-basic"
                label="Nomor Akun Bank Publisher"
                variant="outlined"
                title="Data tidak boleh kosong"
                type="Number"
                name="bank_account_number"
                required
              />
              <TextField
                id="outlined-basic"
                label="Akun Bank Detail"
                variant="outlined"
                title="File tidak boleh kosong"
                type="Text"
                name="bank_account_detail"
                required
              />
              {props.isLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "8vmin",
                  }}
                >
                  <CircularProgress color="#457b9d" />
                </div>
              ) : (
                <ColorButton variant="contained" size="large" type="submit">
                  Register
                </ColorButton>
              )}
            </form>
          </div>
        </Grid>
      </Box>
    </div>
  );
};
