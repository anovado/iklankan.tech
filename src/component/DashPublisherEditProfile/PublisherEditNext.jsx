import React from "react";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: "#457B9D",
    marginBottom: 10,
  },
  form: {
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
    marginTop: "5vmin",
  },
  submit: {
    width: "80vmin",
    margin: theme.spacing(1),
    paddingLeft: 5,
    paddingRight: 5,
    color: "#fff",
    backgroundColor: "#457b9d",
    "&:hover": {
      backgroundColor: "#457b9d",
    },
  },
  labelBrowse: {
    textAlign: "left",
    fontSize: "12px",
    marginTop: 8,
    marginLeft: 15,
    marginBottom: 0,
    color: "#000",
  },
  buttonCancel: {
    width: "80vmin",
    margin: theme.spacing(1),
    paddingLeft: 5,
    paddingRight: 5,
    color: "#fff",
    backgroundColor: "#E63946",
    "&:hover": {
      backgroundColor: "#E63946",
    },
  },
}));

export const EditPublisherNext = (props) => {
  const classes = useStyles();
  const publisher = props.publisherProfile;
  const handleSubmit = async (event) => {
    event.preventDefault();
    props.doValidateFormRegisterPublisherTwo(event.target);
    await props.editDataPublisher();
    await props.backProfile();
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {publisher.publisher_name}
          </Typography>

          <form
            className={classes.form}
            autoComplete="off"
            method="POST"
            onSubmit={(e) => handleSubmit(e)}
            noValidate
          >
            <div className={classes.labelBrowse}>Upload Foto Profil</div>
            <TextField
              id="standard-size-small"
              label=""
              variant="outlined"
              type="File"
              name="publisher_pict"
            />
            <TextField
              variant="outlined"
              id="namaUsaha"
              label="Nama Pemilik Rekening"
              name="bank_account_name"
              type="Text"
              defaultValue={publisher.bank_account_name}
            />
            <TextField
              variant="outlined"
              name="bank_account_number"
              label="Nomor Rekening Bank"
              type="Text"
              id="alamatPublisher"
              defaultValue={publisher.bank_account_number}
            />
            <TextField
              id="filled-multiline-static"
              label="Detail Rekening Bank"
              name="bank_account_detail"
              multiline
              rows={4}
              variant="outlined"
              defaultValue={publisher.bank_account_detail}
            />
            {props.isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  // marginLeft: "46vmin",
                  color: "#457b9d",
                }}
              >
                <CircularProgress color="#457b9d" />
              </div>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            )}

            <Button
              component={Link}
              to="/dashboard/publisher/profile"
              className={classes.buttonCancel}
              type="button"
              variant="contained"
              color="danger"
            >
              Cancel
            </Button>
          </form>
        </div>
      </Container>
      <div style={{ height: "20vmin" }} />
    </div>
  );
};
