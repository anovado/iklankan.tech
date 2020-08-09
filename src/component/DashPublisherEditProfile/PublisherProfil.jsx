import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Profile.css";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import PaymentIcon from "@material-ui/icons/Payment";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountBalanceWalletRoundedIcon from "@material-ui/icons/AccountBalanceWalletRounded";
import CreditCardRoundedIcon from "@material-ui/icons/CreditCardRounded";
import DraftsRoundedIcon from "@material-ui/icons/DraftsRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import IconButton from "@material-ui/core/IconButton";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0 1px 2px 1px rgba(29,53,87,0.4)",
    height: "40vmin",
    marginBottom: 10,
    marginTop: 20,
    backgroundColor: "#F1FAEE",
    marginLeft: 20,
    marginRight: 20,
  },
  avatar: {
    width: "50vmin",
    height: "50vmin",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "15px",
  },
  editPencil: {
    color: "#444140",
    display: "flex",
    marginLeft: "auto",
    paddingRight: 0,
    marginRight: 0,
    justifyContent: "right",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  name: {
    marginTop: theme.spacing(10),
    color: "#1d3557",
    fontWeight: "bolder",
  },
  button: {
    width: "37vmin",
    textDecoration: "none",
    color: "#fff",
    fontSize: 12,
    backgroundColor: "#1d3557",
    "&:hover": {
      backgroundColor: "#1d3557",
    },
  },
  editProfile: {
    width: "80vmin",
    paddingLeft: 5,
    paddingRight: 5,
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#457B9D",
    "&:hover": {
      backgroundColor: "#457B9D",
    },
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
  data: {
    display: "flex",
    textAlign: "left",
    marginLeft: "5vmin",
    marginTop: "3vmin",
    color: "#1d3557",
    fontSize: "15px",
  },
}));

const PublisherProfileComp = (props, deletePublisher) => {
  const classes = useStyles();

  // to handle deleting publisher data
  deletePublisher = async () => {
    if (props.doDeletePublisher) {
      await props.doDeletePublisher();
      await props.doEditIsPublisher();
      props.history.replace("/profile");
    }
  };

  const publisherProfile = props.publisherProfile;

  return (
    <Fragment>
      <div className="pr-content pr-margin-top">
        <div className="pr-row-padding ">
          <div className="pr-third">
            <Avatar
              alt="User Profile"
              className={classes.avatar}
              src={publisherProfile.publisher_pict}
            />
            <div className="pr-white pr-text-grey pr-card-4">
              <div className="pr-container" style={{ marginTop: "-25%" }}>
                <Link to="/dashboard/publisher/profile/edit">
                  <IconButton edge="center" className={classes.editPencil}>
                    <EditRoundedIcon />
                  </IconButton>
                </Link>
                <div>
                  {props.isLoading ? (
                    <div
                      style={{
                        display: "flex",
                        marginTop: "20vmin",
                        justifyContent: "center",
                        // marginLeft: "46vmin",
                        color: "#1d3557",
                      }}
                    >
                      <CircularProgress color="#1d3557" />
                    </div>
                  ) : (
                    <Typography
                      className={classes.name}
                      component="h1"
                      variant="h6"
                    >
                      {publisherProfile.publisher_name}
                    </Typography>
                  )}
                </div>

                <div className={classes.data} style={{ marginTop: "10vmin" }}>
                  <div style={{ marginRight: "7vmin" }}>
                    <HomeRoundedIcon />
                  </div>

                  <div>{publisherProfile.publisher_name}</div>
                </div>
                <div className={classes.data}>
                  <div style={{ marginRight: "7vmin" }}>
                    <RoomRoundedIcon />
                  </div>

                  <div>{publisherProfile.address}</div>
                </div>
                <div className={classes.data}>
                  <div style={{ marginRight: "7vmin" }}>
                    <PaymentIcon />
                  </div>

                  <div>{publisherProfile.npwp_number}</div>
                </div>
                <div className={classes.data}>
                  <div style={{ marginRight: "7vmin" }}>
                    <PersonIcon />
                  </div>

                  <div>a.n. {publisherProfile.bank_account_name}</div>
                </div>

                <div className={classes.data}>
                  <div style={{ marginRight: "7vmin" }}>
                    <AccountBalanceWalletRoundedIcon />
                  </div>

                  <div>{publisherProfile.bank_account_number}</div>
                </div>
                <div className={classes.data}>
                  <div style={{ marginRight: "7vmin" }}>
                    <AccountBalanceIcon />
                  </div>

                  <div>{publisherProfile.bank_account_detail}</div>
                </div>
                <hr />
                <Grid container spacing={3}>
                  <Grid item xs={6} sm={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      href={publisherProfile.npwp_pict}
                      target="_blank"
                      className={classes.button}
                      endIcon={<CreditCardRoundedIcon />}
                    >
                      NPWP
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      href={publisherProfile.company_sertificate}
                      target="_blank"
                      className={classes.button}
                      endIcon={<DraftsRoundedIcon />}
                    >
                      Perizinan
                    </Button>
                  </Grid>
                </Grid>
                <hr />
                <Button
                  variant="contained"
                  className={classes.buttonLogout}
                  autoCapitalize
                  type="button"
                  onClick={() => deletePublisher()}
                >
                  Tutup Toko
                </Button>

                <br />
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PublisherProfileComp;
