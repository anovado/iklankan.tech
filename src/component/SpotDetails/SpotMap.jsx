import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { motion } from "framer-motion";

import SpotLocation from "./SpotLocation";

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
    height: "35px",
    marginTop: "2vmin",
    marginBottom: "6vmin",
    textDecoration: "none",
    boxShadow: "0 1px 2px 1px rgba(0,0,0,0.4)",
    border: 0,
    borderRadius: 4,
    fontWeight: 500,
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

const MapDialog = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // handle to open map
  const handleClickOpen = () => {
    setOpen(true);
  };

  // handle to close map
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <motion.button
        variant="outlined"
        className={classes.button}
        onClick={handleClickOpen}
        animate={{ y: "2vmin" }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        Lihat di Peta
      </motion.button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        style={{ zIndex: 2600 }}
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
              Lokasi Spot
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          variant="outlined"
          style={{
            height: "100%",
            position: "relative",
            width: "100%",
            zIndex: "9999",
          }}
        >
          <SpotLocation lat={props.lat} long={props.long} />
        </div>
      </Dialog>
    </div>
  );
};

export default MapDialog;
