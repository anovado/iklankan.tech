import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import MapForPicker from "./MapsElement";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import "../../assets/css/mapCenter.css";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#1D3557",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  button: {
    width: "80vmin",
    marginTop: 15,
    marginBottom: 15,
    // paddingLeft: 5,
    // paddingRight: 5,
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#457B9D",
    "&:hover": {
      backgroundColor: "#457B9D",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const MapDialog = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const [markerPosition, setMarkerPosition] = React.useState({ lat: -7.9664667, lng: 112.6103294})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        className={classes.button}
        color="primary"
        onClick={handleClickOpen}
      >
        Pilih Lokasi Spot Anda
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Pilih Lokasi Spot
            </Typography>
            <Button
              autoFocus
              color="inherit"
              style={{ marginTop: 3 }}
              onClick={handleClose}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div
          variant="outlined"
          style={{
            height: "80%",
            position: "relative",
            width: "100%",
            zIndex: "9999",
          }}
        >
          <MapForPicker
            markerPosition={props.markerPosition}
            setMarkerPosition={props.setMarkerPosition}
          />
          <div className={"centerMarker"} />
        </div>
        <div style={{ padding: "5vmin" }}>
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="text primary button group"
          >
            <TextField
              id="outlined-basic"
              label="Latitude"
              value={props.markerPosition.lat}
              variant="outlined"
              size="small"
              inputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="outlined-basic"
              label="Langitude"
              value={props.markerPosition.lng}
              variant="outlined"
              size="small"
              inputProps={{
                readOnly: true,
              }}
            />
          </ButtonGroup>
        </div>
      </Dialog>
    </div>
  );
};
