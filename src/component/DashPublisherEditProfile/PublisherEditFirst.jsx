import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#457B9D",
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
}));

export const EditPublisherFirst = (props) => {
  const classes = useStyles();
  const publisher = props.publisherProfile;
  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.doValidateFormRegisterPublisherOne(event.target);
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
            <TextField
              variant="outlined"
              id="namaUsaha"
              label="Nama Usaha"
              name="publisher_name"
              type="Text"
              defaultValue={publisher.publisher_name}
            />
            <TextField
              variant="outlined"
              name="address"
              label="Alamat"
              type="Text"
              id="alamatPublisher"
              defaultValue={publisher.address}
            />
            <TextField
              variant="outlined"
              id="nomorNpwp"
              label="Nomor NPWP"
              name="npwp_number"
              type="Text"
              defaultValue={publisher.npwp_number}
            />
            <div className={classes.labelBrowse}>Upload Foto NPWP</div>
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
              type="File"
              name="npwp_pict"
            />
            <div className={classes.labelBrowse}>Upload Sertifikat Usaha</div>
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
              type="File"
              name="company_sertificate"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Next
            </Button>
          </form>
        </div>
      </Container>
      <div style={{ height: "20vmin" }} />
    </div>
  );
};
