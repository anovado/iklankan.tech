import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EventNoteRoundedIcon from "@material-ui/icons/EventNoteRounded";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import addDays from "date-fns/addDays";
import format from "date-fns/format";
import { id } from "date-fns/locale";

const useStyles = makeStyles({
  root: {
    border: 0,
    marginBottom: 10,
    marginTop: 10,
  },
  media: {
    width: "25vmin",
    height: "20vmin",
    borderRadius: 12,
  },
  action: {
    display: "flex",
    marginTop: -15,
    paddingTop: 0,
    justifyContent: "flex-end",
    marginLeft: 15,
    marginBottom: 15,
  },
  button: {
    display: "flex",
    alignItems: "center",
    marginRight: 0,
    paddingRight: 0,
    width: "20vmin",
    color: "#1D3557",
  },
  firstLine: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: "2.5vh",
    textAlign: "left",
    marginLeft: 5,
    fontWeight: 500,
  },
  price: {
    fontSize: "2vh",
    marginTop: 5,
    paddingTop: 0,
    marginBottom: 5,
    color: "#457B9D",
    textAlign: "left",
    marginLeft: 5,
    display: "flex",
    alignItems: "center",
  },
  subtitle: {
    marginRight: 10,
    color: "#457B9D",
  },
  date: {
    marginLeft: 5,
    display: "flex",
    color: "#457B9D",
    textAlign: "left",
    fontSize: "2vh",
    alignItems: "center",
  },
  status: {
    marginTop: 5,
    fontSize: "2.4vh",
    textAlign: "left",
    fontWeight: 500,
  },
});

export default function SpotInCart(props) {
  const classes = useStyles();
  const first = Date.parse(props.starting_date);
  const newDate = new Date(first);
  const endDate = addDays(newDate, props.durations * 30);
  const startPeriod = format(newDate, "d MMMMMMMMM yyyy", { locale: id });
  const endPeriod = format(endDate, "d MMMMMMMMM yyyy", { locale: id });
  const dates = `${startPeriod} - ${endPeriod}`;

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.firstLine}>
          <div>
            <img src={props.image} className={classes.media} alt="spot" />
          </div>
          <div>
            <div className={classes.title}>{props.name}</div>
            <div className={classes.price}>
              <div className={classes.subtitle}>
                <LocalOfferRoundedIcon />
              </div>
              Rp {props.price.toLocaleString()} ,-
            </div>
            <div className={classes.date}>
              <div className={classes.subtitle}>
                <EventNoteRoundedIcon />
              </div>
              {dates}
            </div>
          </div>
        </div>
        <div className={classes.status}>
          Status: {props.status === "diterima" ? "disetujui" : props.status}
        </div>
      </div>
      <div className={classes.action}>
        <Button
          size="small"
          className={classes.button}
          onClick={() => props.handleDeleteCart(props.id)}
        >
          <DeleteRoundedIcon />
        </Button>
      </div>
    </div>
  );
}
