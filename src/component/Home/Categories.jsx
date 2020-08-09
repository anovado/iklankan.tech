import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { motion } from "framer-motion";

const useStyles = makeStyles({
  category: {
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-around",
  },
  logo: {
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "3vmin",
    width: "10vmin",
    height: "10vmin",
  },
  logoBox: {
    boxShadow: "0 1px 2px 1px rgba(0,0,0,0.3)",
    borderRadius: 8,
    fontSize: "2.3vh",
    marginTop: "2vmin",
    marginBottom: 5,
    marginLeft: "4vmin",
    marginRight: "4vmin",
    paddingLeft: "5vmin",
    paddingRight: "5vmin",
    height: "15vmin",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    backgroundColor: "#F0F4FA",
    textDecoration: "none",
    color: "#191923",
    fontWeight: 500,
    fontFamily: "Montserrat, sans-serif",
  },
});

export const Categories = (props) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container spacing={0} className={classes.category}>
        <Grid item xs={6} sm={6}>
          <motion.div
            className={classes.logoBox}
            style={{ marginLeft: "4vmin", marginRight: "2vmin" }}
            onClick={() => props.handleCategory("1")}
            initial={{ y: "-5vmin" }}
            animate={{ y: "2vmin" }}
            transition={{ ease: "easeOut", duration: 2 }}
          >
            <img
              src={require("../../assets/images/videotron.png")}
              alt="Videotron"
              className={classes.logo}
            />
            <div>Videotron</div>
          </motion.div>
        </Grid>
        <Grid item xs={6} sm={6}>
          <motion.div
            className={classes.logoBox}
            style={{ marginLeft: "2vmin", marginRight: "4vmin" }}
            onClick={() => props.handleCategory("2")}
            initial={{ y: "-5vmin" }}
            animate={{ y: "2vmin" }}
            transition={{ ease: "easeOut", duration: 2 }}
          >
            <div>
              <img
                src={require("../../assets/images/billboard.png")}
                alt="Billboard"
                className={classes.logo}
              />
            </div>
            <div>Baliho</div>
          </motion.div>
        </Grid>
        <Grid item xs={6} sm={6}>
          <motion.div
            className={classes.logoBox}
            style={{ marginLeft: "4vmin", marginRight: "2vmin" }}
            onClick={() => props.handleCategory("3")}
            initial={{ y: "-5vmin" }}
            animate={{ y: "2vmin" }}
            transition={{ ease: "easeOut", duration: 2 }}
          >
            <img
              src={require("../../assets/images/neon-box.png")}
              alt="Neon box"
              className={classes.logo}
            />
            <div>Neonbox</div>
          </motion.div>
        </Grid>
        <Grid item xs={6} sm={6}>
          <motion.div
            className={classes.logoBox}
            style={{ marginLeft: "2vmin", marginRight: "4vmin" }}
            onClick={() => props.handleCategory("4")}
            initial={{ y: "-5vmin" }}
            animate={{ y: "2vmin" }}
            transition={{ ease: "easeOut", duration: 2 }}
          >
            <img
              src={require("../../assets/images/spanduk.png")}
              alt="Spanduk"
              className={classes.logo}
            />
            <div>Spanduk</div>
          </motion.div>
        </Grid>
      </Grid>
    </Fragment>
  );
};
