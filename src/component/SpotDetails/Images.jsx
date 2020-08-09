import React, { Fragment } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import SimpleBackdrop from "./Loading";

export default function Images(props) {
  const images = props.images;

  if (!images) {
    return <SimpleBackdrop />;
  } else {
    return (
      <Fragment>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            {images.slice(1).map((_, index) => (
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to={index + 1}
              ></li>
            ))}
          </ol>
          <div className="carousel-inner">
            {images.slice(0, 1).map((el, index) => (
              <div className="carousel-item active" key={index}>
                <img
                  src={el.name}
                  className="d-block w-100"
                  style={{ height: "60vmin" }}
                  alt="spot"
                />
              </div>
            ))}

            {images.slice(1).map((el, index) => (
              <div className="carousel-item" key={index}>
                <img
                  src={el.name}
                  className="d-block w-100"
                  alt={el.description}
                  style={{ height: "60vmin" }}
                />
              </div>
            ))}
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </Fragment>
    );
  }
}
