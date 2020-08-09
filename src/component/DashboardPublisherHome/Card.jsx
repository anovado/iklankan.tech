import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import numeral from "numeral";
import "date-fns";
import addDays from "date-fns/addDays";
import format from "date-fns/format";
import { id } from "date-fns/locale";

import SimpleBackdrop from "../SpotDetails/Loading";

const useStyles = makeStyles({
  root: {
    marginBottom: "4vmin",
    backgroundColor: "#F0F4FA",
  },
  media: {
    height: 140,
  },
  label: {
    fontSize: "2vh",
    color: "#191923",
  },
});

export const CardDashboardPublisher = (props) => {
  const classes = useStyles();
  const dataSpot = props.dataSpot;

  // to get the end period based on the selected duration
  const first = Date.parse(dataSpot.starting_date);
  const newDate = new Date(first);
  const endDate = addDays(newDate, dataSpot.durations * 30);

  // to format the date into human readable format in Indonesian
  const startPeriod = format(newDate, "d MMMMMMMMM yyyy", {
    locale: id,
  });
  const endPeriod = format(endDate, "d MMMMMMMMM yyyy", { locale: id });
  const period = `${startPeriod} - ${endPeriod}`;

  if (!dataSpot) {
    return <SimpleBackdrop />;
  } else {
    return (
      <Fragment>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={dataSpot.spot_images[0].name}
              title="spot"
            />
            <CardContent
              style={{ textAlign: "left", paddingTop: 10, paddingBottom: 0 }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ color: "#191923" }}
              >
                {dataSpot.spot_detail.name}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={classes.label}
              >
                Periode:
              </Typography>
              <Typography
                variant="body2"
                component="p"
                style={{ fontSize: "2.2vh", color: "#457B9D" }}
              >
                {period}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={classes.label}
              >
                Keperluan:
              </Typography>
              <Typography
                variant="body2"
                component="p"
                style={{ fontSize: "2.2vh", color: "#457B9D" }}
              >
                {dataSpot.purpose}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={classes.label}
              >
                Total transaksi:
              </Typography>
              <Typography
                variant="body2"
                component="p"
                style={{ fontSize: "2.2vh", color: "#457B9D" }}
              >
                Rp {numeral(dataSpot.price).format(0, 0)} ,-
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <Button
              style={{ color: "#E63946 " }}
              onClick={() => props.declineCartPermission(dataSpot.id)}
            >
              Tolak
            </Button>
            <Button
              color="primary"
              onClick={() => props.approveCartPermission(dataSpot.id)}
            >
              Terima
            </Button>
          </CardActions>
        </Card>
      </Fragment>
    );
  }
};
