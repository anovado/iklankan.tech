import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    marginTop: "60px",
    boxShadow: "0 0 0",
    display: "flex",
    justifyContent: "center",
  },
  media: {
    height: 225,
    boxShadow: "0 0 0",
    display: "flex",
    justifyContent: "center",
  },
  mediaContainer: {
    display: "block",
    justifyContent: "center",
  },
  centered: {
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "3.1vh",
    fontWeight: 600,
    width: "70vmin",
    backgroundColor: "rgba(240, 244, 250, 0.8)",
    color: "#1D3557",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
  },
});

export default function Jumbotron() {
  const classes = useStyles();

  return (
    <Fragment>
      <div style={{ height: "60px" }} />
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div
            className="carousel-item active"
            style={{
              position: "relative",
              textAlign: "center",
              color: "white",
            }}
          >
            <img
              src={require("../../assets/images/billboard2.jpg")}
              className="d-block w-100"
              style={{ height: "60vmin" }}
              alt="spot"
            />
            <div className={classes.centered}>
              Temukan ribuan spot iklan terbaik disini!
            </div>
          </div>

          <div
            className="carousel-item"
            style={{
              position: "relative",
              textAlign: "center",
              color: "white",
            }}
          >
            <img
              src={require("../../assets/images/imageedit_6_3738025322.jpg")}
              className="d-block w-100"
              alt="jumbotron"
              style={{ height: "60vmin" }}
            />
            <div className={classes.centered} style={{ paddingBottom: 10 }}>
              Punya spot iklan?
              <Button
                variant="contained"
                component={Link}
                to="/register/publisher"
                style={{
                  boxShadow: "0 0 0",
                  textTransform: "capitalize",
                  backgroundColor: "#1D3557",
                  color: "#F0F4FA",
                  width: "60vmin",
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
              >
                Gabung Sebagai Publisher
              </Button>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </Fragment>
  );
}
