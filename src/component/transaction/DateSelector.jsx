import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import EventNoteRoundedIcon from "@material-ui/icons/EventNoteRounded";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import addDays from "date-fns/addDays";
import format from "date-fns/format";
import { id } from "date-fns/locale";

import SimpleBackdrop from "../SpotDetails/Loading";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "25vmin",
    marginTop: 15,
    marginLeft: 0,
    marginRight: 0,
  },
  duration: {
    textAlign: "left",
  },
  date: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    display: "flex",
    justifyContent: "space-between",
  },
  media: {
    width: "25vmin",
    height: "20vmin",
    borderRadius: 12,
    marginLeft: 0,
  },
  firstLine: {
    display: "flex",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: "2.7vh",
    textAlign: "left",
    marginLeft: 5,
    fontWeight: 500,
  },
  price: {
    fontSize: "2.5vh",
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
  dates: {
    marginLeft: 5,
    marginTop: 15,
    display: "flex",
    color: "#457B9D",
    textAlign: "left",
    fontSize: "2.5vh",
    alignItems: "center",
  },
}));

export default function DurationSelector(props) {
  const classes = useStyles();
  const [duration, setDuration] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(props.date);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.getDates(date);
  };

  const handleChange = (event) => {
    setDuration(event.target.value);
    props.changePrice(event.target.value);
  };

  // to get the end period based on the selected duration
  const endDate = addDays(props.date, props.duration * 30);

  // to format the date into human readable format
  const startPeriod = format(props.date, "d MMMMMMMMM yyyy", { locale: id });
  const endPeriod = format(endDate, "d MMMMMMMMM yyyy", { locale: id });

  // const duration = props.duration;
  if (!props.price) {
    return <SimpleBackdrop />;
  } else {
    return (
      <Fragment>
        <div>
          <div className={classes.firstLine}>
            {props.image.slice(0, 1).map((el, index) => (
              <div key={index}>
                <img src={el.name} className={classes.media} alt="spot" />
              </div>
            ))}
            <div>
              <div className={classes.title}>{props.name}</div>
              <div className={classes.price}>
                Rp {props.price.toLocaleString()}
              </div>
            </div>
          </div>
          <div className={classes.dates}>
            <div className={classes.subtitle}>
              <EventNoteRoundedIcon />
            </div>
            {startPeriod} - {endPeriod}
          </div>
        </div>
        <div className={classes.date}>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Pilih tanggal mulai sewa"
                format="dd/MM/yyyy"
                value={selectedDate}
                style={{ width: "55vmin", marginLeft: 0 }}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.duration}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Durasi</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={duration}
                onChange={handleChange}
              >
                <MenuItem value={0}>1 bulan</MenuItem>
                <MenuItem value={1}>2 bulan</MenuItem>
                <MenuItem value={2}>3 bulan</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </Fragment>
    );
  }
}
