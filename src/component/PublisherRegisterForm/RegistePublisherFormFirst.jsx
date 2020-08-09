import React from "react";

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

export const RegistePublisherFormFirst = (props) => {
  const style = useStyles();

  // to handle submit data to the next form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.doValidateFormRegisterPublisherOne(event.target);
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
              <TextField
                id="outlined-basic"
                label="Nama Publisher"
                variant="outlined"
                type="Text"
                name="publisher_name"
                title="Data tidak boleh kosong"
                // onChange={props.handleChange}
                required
              />
              <TextField
                id="outlined-basic"
                label="Alamat Publisher"
                variant="outlined"
                title="Data tidak boleh kosong"
                type="Text"
                name="address"
                // onChange={props.handleChange}
                required
              />
              <TextField
                id="outlined-basic"
                label="Nomor NPWP"
                variant="outlined"
                title="File tidak boleh kosong"
                type="Number"
                name="npwp_number"
                // onChange={props.handleChange}
                required
              />

              <div className={style.labelBrowse}>Upload Foto Kartu NPWP</div>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                title="File tidak boleh kosong"
                type="File"
                name="npwp_pict"
                // onChange={props.handleFileChange}
                required
              />

              <div className={style.labelBrowse}>
                Upload Berkas Sertifikat Izin Usaha
              </div>

              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                type="File"
                name="company_sertificate"
                // onChange={props.handleFileChange}
                required
              />
              <ColorButton variant="contained" size="large" type="submit">
                Next
              </ColorButton>
            </form>
          </div>
        </Grid>
      </Box>
    </div>
  );
};
