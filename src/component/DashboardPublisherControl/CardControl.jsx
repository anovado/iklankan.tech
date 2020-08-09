import React, { Fragment } from "react";
// import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import CircularProgress from "@material-ui/core/CircularProgress";

import SimpleBackdrop from "../SpotDetails/Loading";

const useStyles = makeStyles({
  root: {
    boxShadow: "0 1px 2px 1px rgba(29,53,87,0.4)",
    // display: "flex",
    // justifyContent: "center",
    height: "36vmin",
    marginBottom: 15,
    backgroundColor: "#F0F4FA",
  },
  box: {
    padding: 20,
    justifyContent: "center",
  },
  name: {
    fontSize: "5vmin",
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 500,
  },
  price: {
    fontSize: "4vmin",
    marginTop: 0,
    paddingTop: 0,
    marginBottom: 0,
    color: "#457B9D",
    fontWeight: 500,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    textAlign: "left",
    paddingLeft: 10,
    paddingTop: 5,
    position: "relative",
  },
  button: {
    marginTop: "10px",
    height: "35px",
    textTransform: "capitalize",
    backgroundColor: "#457B9D",
    boxShadow: "0 1px 2px 1px rgba(0,0,0,0.4)",
    color: "#fff",
    fontSize: "12px",
    marginLeft: 10,
    marginRight: 10,
  },
  buttonWarning: {
    marginTop: "10px",
    height: "35px",
    textTransform: "capitalize",
    backgroundColor: "#E63946",
    boxShadow: "0 1px 2px 1px rgba(0,0,0,0.4)",
    color: "#fff",
    fontSize: "12px",
    marginRight: 5,
    border: 0,
    width: 63,
    borderRadius: 4,
    fontWeight: 500,
  },
  controls: {
    display: "flex",
    alignItems: "center",
  },
  timestamp: {
    fontSize: "1.9vh",
    position: "absolute",
    display: "flex",
    marginTop: "auto",
    justifyContent: "bottom",
  },
});

export default function CardControlDashboardPublisher(props, editClick) {
  const classes = useStyles();

  // to handle editing spot data
  editClick = async (id) => {
    if (props.handleEditClick) {
      await props.handleEditClick(id);
    }
  };

  if (!props.name) {
    return <SimpleBackdrop />;
  } else {
    return (
      <Fragment>
        <Card className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <p className={classes.name}>{props.name}</p>
              <p className={classes.price}>
                Rp {props.price.toLocaleString()} / bulan
              </p>
              <div>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  className={classes.timestamp}
                >
                  {props.status}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    marginTop: "5px",
                    display: "flex",
                  }}
                >
                  <Button
                    onClick={() => editClick(props.id)}
                    value={props.id}
                    className={classes.button}
                  >
                    Ubah
                  </Button>
                  {/* {props.isLoading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        // marginTop: "20vmin",
                        color: "#1d3557",
                      }}
                    >
                      <CircularProgress color="#457b9d" />
                    </div>
                  ) : ( */}
                  <button
                    onClick={() => props.delSpot(props.id)}
                    value={props.id}
                    className={classes.buttonWarning}
                  >
                    Hapus
                  </button>
                  {/* )} */}
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </Fragment>
    );
  }
}
