import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Banner from "../../component/SpotDetails/Banner";
import DetailData from "../../component/SpotDetails/DetailData";
import MapDialog from "../../component/SpotDetails/SpotMap";
import TopAppBarAdmin from "../../component/TopAppBarAdmin";
import DashboardAdminAppBar from "../../component/DashboardAdminAppBar";
import Images from "../../component/SpotDetails/Images";
import { withStyles } from "@material-ui/core";
import { getSpotById } from "../../redux/action/admin/spotAdminAction";
import { doLogOut } from "../../redux/action/userAction";

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
  button: {
    marginTop: "10px",
    marginBottom: "10px",
    height: "35px",
    textTransform: "capitalize",
    textDecoration: "none",
    backgroundColor: "#457b9d",
    boxShadow: "0 1px 2px 1px rgba(0,0,0,0.4)",
    color: "#fff",
    border: 0,
    width: "80vmin",
    borderRadius: 4,
    fontWeight: 500,
  },
  image: {
    marginTop: "10px",
  },
  button1: {
    "& > *": {
      margin: theme.spacing(1),
      width: "38vmin",
      marginBottom: "20vmin",
    },
  },
  tolak: {
    backgroundColor: "#e63946",
    color: "#fff",
    textTransform: "capitalize",
  },
  terima: {
    backgroundColor: "#457b9d",
    color: "#fff",
    textTransform: "capitalize",
  },
  batas: {
    marginBottom: "20px",
    marginTop: "20px",
  },
});

class NewSpotDetail extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    const status = localStorage.getItem("status");
    const login = localStorage.getItem("isLogin");
    if (login) {
      if (status === "user") {
        await this.props.history.replace("/");
      }
      await this.props.getSpotById(this.props.match.params.id);
    } else {
      await this.props.history.push("/signin");
    }
  };
  render() {
    const { classes } = this.props;
    const spot = this.props.spoyById;
    return (
      <Fragment>
        <TopAppBarAdmin title={"Titik Iklan"} />
        <div style={{ height: "46px" }} />
        <div className={classes.image}>
          <Images images={this.props.images} />
        </div>
        <div className={classes.batas}>
          <Banner name={spot.name} address={spot.address} />
        </div>
        <hr className={classes.divider} style={{ marginBottom: 10 }} />
        <h4 className={classes.labelBrowse}>Rp {this.props.price},-</h4>
        <hr className={classes.divider} style={{ marginTop: 10 }} />
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

        <Link to="">
          <button className={classes.button}>Lihat Dokumen Pelengkap</button>
        </Link>

        <div style={{ height: "25vmin" }} />
        <DashboardAdminAppBar {...this.props} />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    spoyById: state.adminSpot.spoyById,
    images: state.adminSpot.spotImages,
    price: state.adminSpot.price,
  };
};

const mapDispatchToProps = {
  getSpotById,
  doLogOut,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(NewSpotDetail));
