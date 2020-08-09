import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  name: {
    fontSize: "2.5vh",
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 500,
    textAlign: "left",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  price: {
    fontSize: "2.3vh",
    marginTop: 0,
    paddingTop: 0,
    marginBottom: 0,
    color: "#1D3557",
    textAlign: "left",
  },
  address: {
    fontSize: "2.3vh",
    marginTop: "auto",
    marginBottom: 0,
    textAlign: "left",
  },
});

const ListCard = (props) => {
  const classes = useStyles();

  const changeRouter = async (id) => {
    if (props.handleRouter) {
      props.handleRouter(id);
    }
  };
  const spot = props.el;
  return (
    <Card className={classes.root} onClick={() => changeRouter(spot.id)}>
      <CardHeader title={spot.name} className={classes.name} />
      <CardMedia
        className={classes.media}
        image={spot.image.name}
        title="spot"
      />
      <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.address}
        >
          {spot.address}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.price}
        >
          Rp {spot.price.toLocaleString()},-
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ListCard;
