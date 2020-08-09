import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Profile.css";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhoneIphoneRoundedIcon from "@material-ui/icons/PhoneIphoneRounded";
import DraftsRoundedIcon from "@material-ui/icons/DraftsRounded";
import ContactMailRoundedIcon from "@material-ui/icons/ContactMailRounded";
import CreditCardRoundedIcon from "@material-ui/icons/CreditCardRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0 1px 2px 1px rgba(29,53,87,0.4)",
    height: "40vmin",
    marginBottom: 10,
    marginTop: 20,
    backgroundColor: "#F0F4FA",
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
    color: "#1D3557",
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
    marginTop: "15vmin",
    color: "#1d3557",
    fontWeight: "bolder",
  },
  buttonDashboard: {
    width: "80vmin",
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
}));

const ProfileComponent = (props, postSignout) => {
  const classes = useStyles();

  // to handle signout
  postSignout = async () => {
    await props.doLogOut();
    props.history.push("/");
  };

  const profile = props.profile;

  return (
    <Fragment>
      <div className="pr-content pr-margin-top">
        <div className="pr-row-padding ">
          <div className="pr-third">
            <Avatar
              alt="User Profile"
              className={classes.avatar}
              src={profile.profil_pict}
            />
            <div className="pr-white pr-text-grey pr-card-4">
              <div className="pr-container" style={{ marginTop: "-25%" }}>
                <Link to="/editprofile">
                  <IconButton edge="center" className={classes.editPencil}>
                    <EditRoundedIcon />
                  </IconButton>
                </Link>
                {props.isLoading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20vmin",
                      color: "#1d3557",
                    }}
                  >
                    <CircularProgress color="#457b9d" />
                  </div>
                ) : (
                  <h3 className={classes.name}>{profile.name}</h3>
                )}
                <div className="biodata" style={{ marginTop: "10vmin" }}>
                  <div style={{ marginRight: "7vmin" }}>
                    <PhoneIphoneRoundedIcon />
                  </div>

                  <div>{profile.phone}</div>
                </div>
                <div className="biodata">
                  <div style={{ marginRight: "7vmin" }}>
                    <DraftsRoundedIcon />
                  </div>

                  <div>{profile.email}</div>
                </div>
                <div className="biodata">
                  <div style={{ marginRight: "7vmin" }}>
                    <ContactMailRoundedIcon />
                  </div>

                  <div>{profile.address}</div>
                </div>
                <div className="biodata">
                  <div style={{ marginRight: "7vmin" }}>
                    <CreditCardRoundedIcon />
                  </div>

                  <div>{profile.KTP_number}</div>
                </div>

                <hr />
                {profile.is_publisher === "true" ? (
                  <Fragment>
                    <Button
                      variant="contained"
                      component={Link}
                      to="/dashboard/publisher"
                      className={classes.buttonDashboard}
                    >
                      Dashboard Publisher
                    </Button>
                    <hr />
                  </Fragment>
                ) : (
                  false
                )}
                <Button
                  variant="contained"
                  component={Link}
                  to="/editpassword"
                  className={classes.buttonPassword}
                >
                  Ubah Password
                </Button>
                <hr />

                <Button
                  variant="contained"
                  className={classes.buttonLogout}
                  type="button"
                  onClick={() => postSignout()}
                >
                  Logout
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

export default ProfileComponent;
