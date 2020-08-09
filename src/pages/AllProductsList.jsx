import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import BottomAppBar from "../component/BottomAppBar";
import TopAppBar from "../component/TopAppBar";
import SpotCard from "../component/SpotCard";
import SimpleBackdrop from "../component/SpotDetails/Loading";

import {
  getAllData,
  getProductById,
} from "../redux/action/publisher/spotAction";

const useStyles = (theme) => ({
  box: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: "70px",
  },
  spot: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  subtitle: {
    textAlign: "left",
    fontSize: "2.4vh",
    fontWeight: 500,
    color: "#191923",
    marginLeft: 5,
  },
});

class AllProductList extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    await this.props.getAllData();
  };

  handleRequestProducts = async (id) => {
    this.props.getProductById(id);
    await this.props.history.push("/spot/" + id);
  };

  render() {
    const { classes } = this.props;
    const spot = this.props.spots;

    if (spot === []) {
      return <SimpleBackdrop />;
    } else {
      return (
        <Fragment>
          <TopAppBar title={"Daftar Spot"} />

          <div className={classes.box}>
            <Grid container spacing={0}>
              {spot
                .sort(() => 0.5 - Math.random())
                .map((el, index) => (
                  <Grid item xs={6} sm={4} key={index}>
                    <div className={classes.spot}>
                      <SpotCard
                        name={el.name}
                        id={el.id}
                        image={el.image.name}
                        price={el.price.toLocaleString()}
                        handleRouter={(e) => this.handleRequestProducts(e)}
                      />
                    </div>
                  </Grid>
                ))}
            </Grid>
          </div>
          <div style={{ height: "25vmin" }} />
          <BottomAppBar />
        </Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    spots: state.control.allSpots,
  };
};

const mapDispatchToProps = {
  getAllData,
  getProductById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(AllProductList));
