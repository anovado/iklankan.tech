import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const SpotLocation = (props) => {
  return (
    <Map
      google={props.google}
      zoom={15}
      style={mapStyles}
      gestureHandling="greedy"
      initialCenter={{ lat: props.lat, lng: props.long }}
      mapTypeControl={false}
      streetViewControl={false}
    >
      <Marker position={{ lat: props.lat, lng: props.long }} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPS_API_KEY,
})(SpotLocation);
