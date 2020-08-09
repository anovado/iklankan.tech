import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

// const gmapkey = process.env.REACT_APP_GMAPS_API_KEY;

const SpotLocation = (props) => {
  const centerMoved = (mapProps, map) => {
    const latt = map.getCenter().lat();
    const longg = map.getCenter().lng();
    // props.setMarkerPosition({ lat: latt, lng: longg });
  };

  return (
    <Map
      google={props.google}
      zoom={18}
      style={mapStyles}
      gestureHandling="greedy"
      initialCenter={{ lat: props.lat, lng: props.long }}
      mapTypeControl={false}
      streetViewControl={false}
      onIdle={centerMoved}
    >
      <Marker
        position={props.markerPosition}
        // draggable={true}
        // onDragend={(e) => handleDragMarker(e.getPosition)}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPS_API_KEY,
})(SpotLocation);
