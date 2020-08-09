import axios from "axios";
import lightFormat from "date-fns/lightFormat";
const apiUrl = process.env.REACT_APP_APIBE_URL;
const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// function to get selected date by user in spot detail
export const getSelectedDate = (e) => {
  return {
    type: "GET_SELECTED_DATE",
    payload: e,
  };
};

// function to get selected duration by user in spot detail
export const getDuration = (e) => {
  return {
    type: "GET_DURATION",
    payload: e,
  };
};

// function to post transaction
export const postTransaction = () => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    await timeout(1500);

    let date = getState().transaction.date;
    if (date === "" || date === undefined) {
      date = new Date();
    }
    const id = localStorage.getItem("id");
    const bodyRequest = {
      ads_spot_id: id,
      starting_date: lightFormat(date, "dd-MM-yyyy"),
      durations: getState().transaction.duration,
      purpose: getState().transaction.purpose,
      design: getState().transaction.design,
      add_text: getState().transaction.add_text,
    };
    const myJSON = JSON.stringify(bodyRequest);

    try {
      await axios.post(apiUrl + "/transaction", myJSON, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "SUCCESS_POST_TRANSACTION",
      });
      dispatch({ type: "STOP_LOADING" });

      localStorage.removeItem("id");
    } catch (err) {
      console.log(err);
    }
  };
};

// function to get transaction detail
export const getTransDetail = (props) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(apiUrl + "/transaction", {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "SUCCESS_GET_TRANSACTION",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// function to handle check out transaction
export const checkOut = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const bodyRequest = {
      status: false,
    };
    const myJSON = JSON.stringify(bodyRequest);
    try {
      await axios.patch(apiUrl + "/transaction/checkout", myJSON, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "SUCCESS_CHECKOUT",
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// function to handle changes in form input
export const changeInput = (e) => {
  return {
    type: "CHANGE_INPUT",
    payload: e,
  };
};

// function to get token from midtrans
export const getTokenFormTansactionID = (transactionID) => {
  return async (dispatch) => {
    try {
      // get token from midtrans
      const dataToken = await axios.get(
        apiUrl + "/midtrans/token/" + transactionID
      );

      const token = dataToken.data.token;

      dispatch({
        type: "SET_MIDTRANS_TOKEN",
        payload: token,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// function to checkout items in cart
export const setTransactionPaymentID = (trxID, status, history) => {
  return async () => {
    const token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const dataReq = { payment_id: status };

      const res = await axios.patch(
        apiUrl + "/transaction/checkout/" + trxID,
        dataReq,
        config
      );

      if (res) {
        history.push("/success");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// function to get data transaction history for user
export const getDataTransactions = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    await timeout(1000);

    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const dataTransaction = await axios.get(
        apiUrl + "/transaction/checkout/history",
        config
      );

      dispatch({
        type: "SET_DATA_TRANSACTION",
        payload: dataTransaction.data,
      });
      dispatch({ type: "STOP_LOADING" });
    } catch (err) {
      console.log(err);
    }
  };
};

export const doDeleteCart = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(apiUrl + "/transaction/" + id, config);
      dispatch({
        type: "DELETE_CART",
      });
    } catch (error) {
      console.log(error);
    }
  };
};
