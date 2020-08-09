import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
// import SimpleBackdrop from "./SpotDetails/Loading";
// import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 210,
    backgroundColor: "#F0F4FA",
  },
  media: {
    height: 140,
  },
  bodyText: {
    fontSize: "2.2vh",
    color: "#191923",
    fontWeight: 500,
  },
  cardContent: {
    padding: 10,
    paddingTop: 5,
  },
  price: {
    color: "#457B9D",
    fontSize: "2vh",
  },
});

const SpotCard = (props) => {
  const classes = useStyles();

  const changeRouter = async (id) => {
    if (props.handleRouter) {
      props.handleRouter(id);
    }
  };

  return (
    <motion.div
      // animate={{ y: 10 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 70,
      }}
      // transition={{ ease: "easeOut", duration: 2 }}
    >
      <Card className={classes.root} onClick={() => changeRouter(props.id)}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.image}
            title="spot iklan"
          />
          <CardContent className={classes.cardContent}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.bodyText}
            >
              {props.name.slice(0, 12) + "..."}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.price}
            >
              Rp {props.price},-
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};

export default SpotCard;
