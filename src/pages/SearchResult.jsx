import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { motion } from "framer-motion";

import BottomAppBar from "../component/BottomAppBar";
import SearchBar from "../component/SearchBar";
import ListCard from "../component/ListCard";

import {
  getDataCategory,
  getProductById,
  getSearchData,
  getCategoryById,
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
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "left",
    fontSize: "2.4vh",
    fontWeight: 500,
    color: "#191923",
    marginLeft: 5,
  },
});

class SearchResult extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    const category = this.props.match.params.id;
    const search = this.props.match.params.keyword;

    // condition to get product by category
    if (category !== "" && category !== undefined) {
      await this.props.getCategoryById(category);
      await this.props.getDataCategory(category);
    }
    // condition to get product by search
    if (search !== "" && search !== undefined) {
      await this.props.getSearchData(search);
    }
  };

  // handle to get product by id
  handleRequestProducts = async (id) => {
    await this.props.history.push("/spot/" + id);
    await this.props.getProductById(id);
  };

  // handle to get product by search
  handleSearch = async (e) => {
    e.preventDefault();
    const keyword = e.target.userSearch.value;
    await this.props.history.push("/allspots/search/" + keyword);
    await this.props.getSearchData(keyword);
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <SearchBar handleSearch={this.handleSearch} />

        <div className={classes.box}>
          {this.props.match.params.id !== "" &&
          this.props.match.params.id !== undefined ? (
            <div className={classes.subtitle}>
              Daftar spot dalam kategori {this.props.category.name}
            </div>
          ) : null}
          {this.props.match.params.keyword !== "" &&
          this.props.match.params.keyword !== undefined ? (
            <div className={classes.subtitle}>
              Hasil pencarian dari {this.props.match.params.keyword}
            </div>
          ) : null}
          {this.props.isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10vmin",
                color: "#14273E",
              }}
            >
              <CircularProgress color="#14273E" />
            </div>
          ) : this.props.spots.length === 0 ? (
            this.props.match.params.id === undefined &&
            this.props.match.params.keyword === undefined ? (
              <div style={{ marginTop: "70px", color: "#777" }}>
                Halaman Pencarian
              </div>
            ) : (
              <div style={{ marginTop: "30px", color: "#777" }}>
                Hasil pencarian tidak ditemukan
              </div>
            )
          ) : (
            <Grid container spacing={0}>
              {this.props.spots.map((el, index) => (
                <Grid item xs={12} sm={12} key={index}>
                  <motion.div
                    className={classes.spot}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 50,
                      damping: 70,
                    }}
                  >
                    <ListCard
                      el={el}
                      handleRouter={(e) => this.handleRequestProducts(e)}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
        <div style={{ height: "25vmin" }} />
        <BottomAppBar />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spots: state.control.searchSpot,
    category: state.control.category,
    isLoading: state.user.isLoading,
  };
};

const mapDispatchToProps = {
  getDataCategory,
  getProductById,
  getSearchData,
  getCategoryById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SearchResult));
