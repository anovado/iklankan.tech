import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

// const gmapkey = process.env.REACT_APP_GMAPS_API_KEY;

const MapForPicker = (props) => {
  // const [markerPosition, setMarkerPosition] = React.useState({ lat: -7.9664667, lng: 112.6103294})

  const centerMoved = (mapProps, map) => {
    const latt = map.getCenter().lat();
    const longg = map.getCenter().lng();

    props.setMarkerPosition({ lat: latt, lng: longg });
  };

  return (
    <Map
      google={props.google}
      zoom={15}
      style={mapStyles}
      gestureHandling="greedy"
      initialCenter={props.markerPosition}
      mapTypeControl={false}
      streetViewControl={false}
      onIdle={centerMoved}
    >
      {/* <Marker 
                position={props.markerPosition}
            /> */}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPS_API_KEY,
})(MapForPicker);
