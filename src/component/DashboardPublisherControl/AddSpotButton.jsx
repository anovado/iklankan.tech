import React, { Fragment } from "react";

import Button from "@material-ui/core/Button";

const AddSpotButton = (props) => {
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: 5,
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <div
          style={{
            textAlign: "left",
            fontSize: "2vh",
            fontWeight: 500,
            color: "#191923",
            alignItems: "center",
          }}
        >
          Kontrol Spot Iklan
        </div>
        <div>
          <Button
            style={{
              alignItems: "center",
              height: "35px",
              textTransform: "capitalize",
              backgroundColor: "#457b9d",
              color: "#fff",
              fontSize: "12px",
              boxShadow: "0 1px 2px 1px rgba(0,0,0,0.4)",
            }}
            type="button"
            onClick={props.handleButtonAddClick}
          >
            Tambah Spot
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default AddSpotButton;
