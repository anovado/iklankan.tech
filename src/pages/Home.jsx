import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import BottomAppBar from "../component/BottomAppBar";
import HomeAppBar from "../component/Home/HomeAppBar";
import SpotCard from "../component/SpotCard";
import Jumbotron from "../component/Home/Jumbotron";
import { Categories } from "../component/Home/Categories";
import SimpleBackdrop from "../component/SpotDetails/Loading";
import { AlerSnackbar } from "../component/Snackbar/Snackbar";

import { hideAlert, showAlertCustom } from "../redux/action/customAction";
import {
  getAllData,
  getProductById,
  getDataCategory,
} from "../redux/action/publisher/spotAction";
import { getUserData } from "../redux/action/userAction";

const useStyles = (theme) => ({
  root: {
    marginTop: "10vmin",
    boxShadow: "0 0 0",
    display: "flex",
    justifyContent: "center",
  },
  box: {
    marginLeft: "4vmin",
    marginRight: "4vmin",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  logo: {
    marginTop: "auto",
    marginBottom: "auto",
    width: "10vmin",
    height: "10vmin",
  },
  logoBox: {
    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.4)",
    borderRadius: 8,
    fontSize: "0.85rem",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#F1FAEE",
  },
  spot: {
    marginLeft: "1vmin",
    marginRight: "1vmin",
    marginTop: "3vmin",
    marginBottom: "1vmin",
  },
  divider: {
    marginBottom: 20,
    border: 0,
    borderTop: "1px solid #eee",
    margin: "20px 0",
    width: "92%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  subtitle: {
    fontSize: "1.3rem",
    fontWeight: 500,
    marginTop: 20,
    marginBottom: 0,
    color: "#191923",
    textAlign: "left",
    marginLeft: "5vmin",
  },
});

class Home extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    await this.props.getAllData();
  };

  // handle to get product by id
  handleRequestProducts = async (id) => {
    this.props.getProductById(id);
    await this.props.history.push("/spot/" + id);
  };

  //  handle to get product by category
  handleCategory = async (id) => {
    await this.props.history.push("/category/" + id);
    await this.props.getDataCategory(id);
  };

  render() {
    const { classes } = this.props;
    const spot = this.props.spots;

    if (spot === []) {
      return <SimpleBackdrop />;
    } else {
      return (
        <Fragment>
          <HomeAppBar />
          <AlerSnackbar
            hideAlert={this.props.hideAlert}
            alert={this.props.alert}
          />
          <Jumbotron />
          <h3 className={classes.subtitle}>Kategori</h3>
          <Categories handleCategory={(id) => this.handleCategory(id)} />
          <hr className={classes.divider} />

          <h3 className={classes.subtitle}>Rekomendasi spot</h3>
          <div className={classes.box}>
            <Grid container spacing={0}>
              {spot
                .sort(() => 0.5 - Math.random())
                .slice(0, 6)
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
    alert: state.custom.alert,
    spots: state.control.allSpots,
    isLoading: state.user.isLoading,
  };
};

const mapDispatchToProps = {
  hideAlert,
  showAlertCustom,
  getAllData,
  getProductById,
  getUserData,
  getDataCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Home));
