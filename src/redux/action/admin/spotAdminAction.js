import axios from "axios";
const apiUrl = process.env.REACT_APP_APIBE_URL;
const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// get all ads spot for admin
export const getSpotData = (props) => {
  return async (dispatch) => {
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    await timeout(1000);

    try {
      const response = await axios.get(apiUrl + "/ads_spot");
      dispatch({
        type: "GET_SPOT_DATA",
        payload: response.data,
      });
      dispatch({ type: "STOP_LOADING" });
    } catch (error) {
      console.log(error);
    }
  };
};

// admi get data spot by id
export const getSpotById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(apiUrl + "/ads_spot/" + id);
      dispatch({
        type: "GET_SPOT_BY_ID",
        payload: response.data,
        images: JSON.parse(response.data.images),
        price: response.data.price.toLocaleString(),
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// admin delete spot
export const doDeleteSpot = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(apiUrl + "/ads_spot/admin/" + id, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: "DELETE_SPOT_ADMIN",
      });
    } catch (error) {
      console.log(error);
    }
  };
};
