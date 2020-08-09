import axios from "axios";
const apiUrl = process.env.REACT_APP_APIBE_URL;
const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// function to get product data based on publisher id
export const getProductData = (props) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(apiUrl + "/ads_spot/publisher", {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "GET_PRODUCT_PUBLISHER",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// function to delete product from dashboard publishers
export const deleteProduct = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(apiUrl + "/ads_spot/" + id, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      getProductData();
      dispatch({
        type: "DELETE_PRODUCT_PUBLISHER",
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// publisher add new ads spot
export const addNewProduct = (e) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      // loading transition
      dispatch({ type: "ACTIVATE_LOADING" });

      const data = new FormData(e.target);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(apiUrl + "/ads_spot", data, config);

      dispatch({
        type: "SHOW_ALERT",
        alert: {
          show: true,
          message: "Data berhasil ditambahkan",
          type: "success",
        },
      });
      dispatch({ type: "STOP_LOADING" });
    } catch (err) {
      dispatch({
        type: "SHOW_ALERT",
        alert: {
          show: true,
          message: "Data gagal ditambahkan",
          type: "error",
        },
      });
    }
  };
};

// to get ads spot by id
export const getProductById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(apiUrl + "/ads_spot/" + id);
      dispatch({
        type: "REQUEST_LIST_PRODUCT_DETAILS",
        payload: response.data,
        price: [
          response.data.price,
          response.data.price * 2,
          response.data.price * 3,
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// to edit some data ads spot
export const doEditAdsSpot = (id, e) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const data = new FormData(e.target);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.patch(apiUrl + "/ads_spot/" + id, data, config);
      getProductData();
    } catch (err) {
      alert("gagal");
    }
  };
};

// function to get all product data
export const getAllData = (props) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(apiUrl + "/ads_spot", {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
        },
      });
      dispatch({
        type: "GET_ALL_PRODUCT",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// get spot data by category
export const getDataCategory = (id) => {
  return async (dispatch) => {
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    await timeout(1000);

    try {
      const response = await axios.get(
        apiUrl + "/ads_spot?product_type_id=" + id
      );
      dispatch({
        type: "GET_BY_CATEGORY",
        payload: response.data,
      });
      dispatch({ type: "STOP_LOADING" });
    } catch (error) {
      console.log(error);
    }
  };
};

// search spot from keyword
export const getSearchData = (keyword) => {
  return async (dispatch) => {
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    await timeout(1000);

    try {
      const response = await axios.get(apiUrl + "/ads_spot?keyword=" + keyword);
      dispatch({
        type: "GET_SEARCH_DATA",
        payload: response.data,
      });
      dispatch({ type: "STOP_LOADING" });
    } catch (error) {
      console.log(error);
    }
  };
};

// get spot category by id
export const getCategoryById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(apiUrl + "/ads_type/" + id);
      dispatch({
        type: "GET_CATEGORY_BY_ID",
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// patch status sewa spot
export const editStatusSpot = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("item");
      const formEdit = new FormData("status", "Disewa");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.patch(apiUrl + "/ads_spot/admin/" + id, formEdit, config);
      dispatch({ type: "EDIT_STATUS_SPOT" });
    } catch (err) {
      console.log(err);
    }
  };
};

// get all spots category
export const getAllCategory = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(apiUrl + "/ads_type");
      dispatch({
        type: "GET_ALL_CATEGORY",
        payload: response.data,
      });
      console.log("response", response);
    } catch (err) {
      console.log(err);
    }
  };
};
