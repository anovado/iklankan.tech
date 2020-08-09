import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display:'flex',
    textAlign:'left'
  },
});

export const HistoryDetail = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography variant="body2" component="h6">
            Nama spot asasasasasasaaaaaaaaaaaa
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Tangal mulai - akhir ssssssss
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
