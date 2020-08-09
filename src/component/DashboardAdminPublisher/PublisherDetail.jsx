import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import "../../assets/css/Profile.css";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import PaymentIcon from "@material-ui/icons/Payment";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountBalanceWalletRoundedIcon from "@material-ui/icons/AccountBalanceWalletRounded";
import CreditCardRoundedIcon from "@material-ui/icons/CreditCardRounded";
import DraftsRoundedIcon from "@material-ui/icons/DraftsRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

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
  name: {
    marginTop: "28vmin",
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
  button1: {
    width: "37vmin",
    textDecoration: "none",
    color: "#fff",
    fontSize: 12,
    backgroundColor: "#457B9D",
    "&:hover": {
      backgroundColor: "#457B9D",
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
  buttonDashboard: {
    width: "37vmin",
    paddingLeft: 5,
    paddingRight: 5,
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#1d3557",
    "&:hover": {
      backgroundColor: "#1d3557",
    },
  },
  buttonPassword: {
    width: "37vmin",
    paddingLeft: 5,
    paddingRight: 5,
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#457B9D",
    "&:hover": {
      backgroundColor: "#457B9D",
    },
  },
}));

const PublisherDetail = (props) => {
  const classes = useStyles();

  const publisherProfile = props.publisherById;

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
                <div>
                  <Typography
                    className={classes.name}
                    component="h1"
                    variant="h6"
                  >
                    {publisherProfile.publisher_name}
                  </Typography>
                </div>

                <div className={classes.data} style={{ marginTop: "5vmin" }}>
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
                      className={classes.button}
                      href={publisherProfile.npwp_pict}
                      target="_blank"
                      endIcon={<CreditCardRoundedIcon />}
                    >
                      NPWP
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      href={publisherProfile.company_sertificate}
                      target="_blank"
                      endIcon={<DraftsRoundedIcon />}
                    >
                      Perizinan
                    </Button>
                  </Grid>
                </Grid>
                <hr />
                {publisherProfile.is_authorized === "false" ? (
                  <Grid container spacing={3}>
                    <Grid item xs={6} sm={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() =>
                          props.handleTolak(
                            publisherProfile.id,
                            publisherProfile.user_id
                          )
                        }
                      >
                        Tolak
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button1}
                        onClick={() => props.handleEdit(publisherProfile.id)}
                      >
                        Terima
                      </Button>
                    </Grid>
                  </Grid>
                ) : null}

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

export default PublisherDetail;
