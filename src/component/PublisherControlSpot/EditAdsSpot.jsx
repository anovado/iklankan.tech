import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import DetailAddressGmaps from "./DetailAddress";
import Slider from "@material-ui/core/Slider";
import { MapDialog } from "./MapDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80vmin",

    "& > *": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: "100%",
    },
    "& label.Mui-focused": {
      color: "#457B9D",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#457B9D",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        //set soft dark input fields
        borderColor: "#A6A2A0",
      },
      "&:hover fieldset": {
        borderColor: "#457B9D",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#457B9D",
      },
    },
  },
  input: {
    display: "none",
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    padding: theme.spacing(3),
  },
  gridMargin: {
    marginTop: "0",
  },
  centered: {
    margin: "auto",
  },
  labelBrowse: {
    textAlign: "left",
    marginLeft: "0vmin",
    fontSize: "12px",
    marginTop: 8,
    marginBottom: "0",
    color: "#457B9D",
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#FFFFFF",
    backgroundColor: "#457B9D",
    height: "3em",
    "&:hover": {
      backgroundColor: "#457B9D",
    },
  },
}))(Button);

const section = {
  marginTop: "70px",
  marginBottom: "auto",
  height: "100vh",
};

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export const EditAddSpotForm = (props) => {
  const style = useStyles();
  const adsSpotId = props.spotById;
  const handleSubmit = async (id, event) => {
    event.preventDefault();
    await props.doEditAdsSpot(id, event);
    await props.history.replace("/dashboard/publisher/control");
  };
  let fullAddress = "";

  const [orentation, setOrentation] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [arah, setArah] = React.useState("");
  //   const [imageForm, setImageForm] = React.useState([0]);
  const [markerPosition, setMarkerPosition] = React.useState({
    lat: adsSpotId.latitude,
    lng: adsSpotId.longitude,
  });
  const [address, setAddress] = React.useState("");

  const handleInputAddress = (addrs, loc) => {
    setAddress(addrs);
    setMarkerPosition(loc);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeOrentation = (event) => {
    setOrentation(event.target.value);
  };

  const handleChangeArah = (event) => {
    setArah(event.target.value);
  };

  return (
    <div style={section}>
      <Box
        display="flex"
        direction="column"
        justifyContent="center"
        alignItems="center"
        marginBottom="20vmin"
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={style.gridMargin}
        >
          <div>
            <form
              className={style.root}
              validate="true"
              autoComplete="off"
              method="POST"
              onSubmit={(e) => handleSubmit(adsSpotId.id, e)}
            >
              <div className={style.labelBrowse}>Identitas Spot</div>

              <TextField
                id="outlined-basic-spot_name"
                label="Nama Spot"
                variant="outlined"
                type="Text"
                name="name"
                title="Data tidak boleh kosong"
                defaultValue={props.spotById.name}
              />

              <TextField
                id="outlined-basic-spot_desc"
                label="Deskripsi Spot"
                variant="outlined"
                type="Text"
                name="description"
                title="Data tidak boleh kosong"
                defaultValue={props.spotById.description}
              />

              <div className={style.labelBrowse}>Kategori Ads Spot</div>

              <TextField
                id="outlined-select-ads_category"
                select
                label="Pilih Kategori"
                value={category}
                onChange={handleChangeCategory}
                variant="outlined"
                style={{ textAlign: "left" }}
                name="product_type_id"
              >
                {props.allCategories.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>

              <div className={style.labelBrowse}>Lokasi Spot</div>

              <DetailAddressGmaps
                handleInputAddress={handleInputAddress}
                setMarkerPosition={setMarkerPosition}
                fullAddress={fullAddress}
                defaultValue={props.spotById.address}
              />

              <TextField
                id="outlined-basic_jalan"
                label="Jalan"
                variant="outlined"
                type="Text"
                name="street"
                title="Data tidak boleh kosong"
                defaultValue={props.spotById.street}
                required
              />

              <input
                id="input-latitude"
                className={style.input}
                type="Text"
                name="latitude"
                value={markerPosition.lat}
              />
              <input
                id="input-longitude"
                className={style.input}
                type="Text"
                name="longitude"
                value={markerPosition.lng}
              />

              <MapDialog
                markerPosition={markerPosition}
                setMarkerPosition={setMarkerPosition}
                address={address}
              />

              <div className={style.labelBrowse} style={{ marginTop: 15 }}>
                Dimensi Spot
              </div>

              <TextField
                id="outlined-basic_dimensi-panjang"
                label="Panjang"
                variant="outlined"
                type="Text"
                name="length"
                title="Data tidak boleh kosong"
                defaultValue={props.spotById.length}
              />

              <TextField
                id="outlined-basic_dimensi-lebar"
                label="Lebar"
                variant="outlined"
                type="Text"
                name="width"
                title="Data tidak boleh kosong"
                defaultValue={props.spotById.width}
              />

              <div className={style.labelBrowse}>Orentasi Spot</div>

              <TextField
                id="outlined-select-dimensi"
                select
                label="Pilih Dimensi"
                value={orentation}
                onChange={handleChangeOrentation}
                variant="outlined"
                style={{ textAlign: "left" }}
                name="orientation"
              >
                {[
                  { id: 1, name: "Horizontal" },
                  { id: 2, name: "Vertical" },
                ].map((option) => (
                  <MenuItem key={option.id}>{option.name}</MenuItem>
                ))}
              </TextField>

              <div className={style.labelBrowse}>Arah Spot</div>

              <TextField
                id="outlined-select-arah"
                select
                label="Pilih Arah"
                value={arah}
                onChange={handleChangeArah}
                variant="outlined"
                style={{ textAlign: "left" }}
                name="facing"
              >
                {[
                  { id: 1, name: "Timur" },
                  { id: 2, name: "Barat" },
                  { id: 3, name: "Selatan" },
                  { id: 4, name: "Utara" },
                ].map((option) => (
                  
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                ))}
              </TextField>

              <div className={style.labelBrowse}>Jumlah Sisi</div>

              <TextField
                id="outlined-select-arah"
                select
                label="Sisi"
                value={arah}
                onChange={handleChangeArah}
                variant="outlined"
                style={{ textAlign: "left" }}
                name="side"
              >
                {[
                  { id: 1, name: "1" },
                  { id: 2, name: "2" },
                ].map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>

              <div className={style.labelBrowse}>Minimum Durasi Sewa</div>
              <TextField
                id="outlined-basic_min-durasi-sewa"
                label="Minimum Durasi Sewa"
                variant="outlined"
                type="Number"
                name="minimum_duration"
                title="Data tidak boleh kosong"
              />

              <div className={style.labelBrowse}>Harga Sewa</div>

              <TextField
                id="outlined-basic_harga_sewa"
                label="Harga Sewa"
                variant="outlined"
                type="Number"
                name="price"
                title="Data tidak boleh kosong"
                defaultValue={props.spotById.price}
              />

              <div className={style.labelBrowse}>Pencahayaan</div>

              <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                name="lighting"
                step={1}
                min={0}
                max={10}
                defaultValue={props.spotById.lighting}
              />

              <div className={style.labelBrowse}>
                Harga Cetak per m<sup>2</sup>
              </div>

              <TextField
                id="outlined-basic-harga_sewa_per_meter"
                label="Harga cetak per ㎡"
                variant="outlined"
                type="Number"
                name="banner_price_per_meter"
                title="Data tidak boleh kosong"
                defaultValue={props.spotById.price}
              />
              <ColorButton variant="contained" size="large" type="submit">
                Simpan
              </ColorButton>
            </form>
          </div>
        </Grid>
      </Box>
    </div>
  );
};
