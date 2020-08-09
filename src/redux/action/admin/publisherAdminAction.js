import axios from "axios";
const apiUrl = process.env.REACT_APP_APIBE_URL;
const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// get data publisher request
export const getPublisherRequest = (props) => {
  return async (dispatch) => {
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    await timeout(1000);

    try {
      const response = await axios.get(
        apiUrl + "/publisher?is_authorized=false"
      );
      dispatch({
        type: "GET_PUBLISHER_REQUEST",
        payload: response.data,
      });
      dispatch({ type: "STOP_LOADING" });
    } catch (error) {
      console.log(error);
    }
  };
};

// get data publisher list
export const getPublisherList = (props) => {
  return async (dispatch) => {
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    await timeout(1000);

    try {
      const response = await axios.get(
        apiUrl + "/publisher?is_authorized=true"
      );
      dispatch({
        type: "GET_PUBLISHER_LIST",
        payload: response.data,
      });
      dispatch({ type: "STOP_LOADING" });
    } catch (error) {
      console.log(error);
    }
  };
};

// get publisher by ID
export const getPublisherById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(apiUrl + "/publisher/" + id);
      dispatch({
        type: "GET_PUBLISHER_BY_ID",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// admin accept publisher
export const doAuthorizedPublisher = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const formAuthorized = new FormData();
      formAuthorized.append("is_authorized", "true");

      await axios.patch(apiUrl + "/publisher/" + id, formAuthorized, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: "IS_AUTHORIZED_PUBLISHER",
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// publisher decline publisher requests
export const doDeletePublisher = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(apiUrl + "/publisher/" + id, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "DELETE_PUBLISHER",
      });
    } catch (error) {
      console.log(error);
    }
  };
};
