import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import axios from "axios";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
  },
}));

export default function DetailAddressGmaps(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        "https://maps.googleapis.com/maps/api/js?key=" +
          process.env.REACT_APP_GMAPS_API_KEY +
          "&libraries=places",
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const getLonLatFromAddress = async (addrs) => {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          addrs +
          "&key=" +
          process.env.REACT_APP_GMAPS_API_KEY +
          ""
      );
      const locPoint = response.data.results[0].geometry.location;
      props.setMarkerPosition(locPoint);
    } catch (err) {
      const locPoint = { lat: -6.2, lng: 106.816666 };
      props.setMarkerPosition(locPoint);
    }
  };

  return (
    <Autocomplete
      id="google-map-demo"
      style={{ width: "80vmin" }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        getLonLatFromAddress(newValue.description);
      }}
      onInputChange={async (event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      // onMouseLeave={async (event, newInputValue) => {
      //   try {
      //     const response =  await axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+event.target.value+'&key='+process.env.REACT_APP_APIBE_URL+'')
      //     const locPoint = response.data.results[0].geometry.location
      //     props.setMarkerPosition(locPoint)
      //   } catch (err) {
      //     const locPoint = {lat : -6.200000, lng : 106.816666}
      //     props.setMarkerPosition(locPoint)
      //   }
      // }}

      renderInput={(params) => (
        <TextField
          {...params}
          label="Masukkan lokasi anda"
          variant="outlined"
          name="address"
          fullWidth
        />
      )}
      renderOption={(option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
