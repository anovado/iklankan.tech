import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";

import BottomAppBar from "../component/BottomAppBar";
import DurationSelector from "../component/SpotDetails/DurationSelector";
import Banner from "../component/SpotDetails/Banner";
import DetailData from "../component/SpotDetails/DetailData";
import MapDialog from "../component/SpotDetails/SpotMap";
import Images from "../component/SpotDetails/Images";
import TopAppBar from "../component/TopAppBar";

import { getProductById } from "../redux/action/publisher/spotAction";
import {
  getSelectedDate,
  getDuration,
} from "../redux/action/transactionAction";

const useStyles = (theme) => ({
  divider: {
    marginBottom: 0,
    marginTop: 0,
    border: 0,
    borderTop: "1px solid #eee",
    width: "92%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  labelBrowse: {
    textAlign: "left",
    marginLeft: "5vmin",
    fontSize: "1.3rem",
    marginTop: 15,
    marginBottom: "0",
    color: "#191923",
    fontWeight: 500,
  },
  sticky: {
    paddingTop: 10,
    backgroundColor: "#fff",
    marginTop: 0,
  },
  button: {
    marginTop: "10px",
    height: "35px",
    textTransform: "capitalize",
    textDecoration: "none",
    backgroundColor: "#E63946",
    boxShadow: "0 1px 2px 1px rgba(0,0,0,0.4)",
    color: "#fff",
    border: 0,
    width: "80vmin",
    borderRadius: 4,
    fontWeight: 500,
  },
});

class Spots extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    const paramCategory = await this.props.match.params.id;
    if (paramCategory) {
      await this.props.getProductById(paramCategory);
    }
  };

  // local state index to get price
  state = {
    index: 0,
  };

  // to handle changing price
  changePrice = (n) => {
    this.setState({ index: n });
    this.props.getDuration(n + 1);
  };

  // to handle add spot to user's cart
  addToCart = async () => {
    const paramCategory = await this.props.match.params.id;
    localStorage.setItem("id", paramCategory);
    this.props.history.push("/posttransaction");
  };

  render() {
    const { classes } = this.props;
    const spot = this.props.spotsId;

    return (
      <Fragment>
        <TopAppBar title={"Halaman Spot"} />
        <div style={{ height: "60px" }} />
        <Images images={this.props.images} />
        <Banner name={spot.name} address={spot.address} />

        <div className={classes.sticky}>
          <hr className={classes.divider} style={{ marginBottom: 10 }} />
          <DurationSelector
            price={this.props.price[this.state.index]}
            index={this.state.index}
            changePrice={(n) => this.changePrice(n)}
            getDates={(e) => this.props.getSelectedDate(e)}
          />
          <hr className={classes.divider} style={{ marginTop: 10 }} />
        </div>

        <p className={classes.labelBrowse}>Lokasi spot:</p>
        <MapDialog lat={spot.latitude} long={spot.longitude} />

        <DetailData
          description={spot.description}
          length={spot.length}
          width={spot.width}
          orientation={spot.orientation}
          facing={spot.facing}
          side={spot.side}
          lighting={spot.lighting}
        />
        <button
          className={classes.button}
          value={spot.id}
          onClick={() => this.addToCart()}
        >
          Tambah ke Keranjang
        </button>

        <div style={{ height: "25vmin" }} />
        <BottomAppBar />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    spotsId: state.control.spotsId,
    images: state.control.images,
    price: state.control.price,
  };
};

const mapDispatchToProps = {
  getProductById,
  getSelectedDate,
  getDuration,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Spots));
