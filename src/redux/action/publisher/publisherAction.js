import axios from "axios";
const apiUrl = process.env.REACT_APP_APIBE_URL;
const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// function to Get Publisher Data
export const getPublisherData = (props) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    await timeout(1000);

    try {
      const response = await axios.get(apiUrl + "/publisher/profile/self", {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "GET_PUBLISHER_DATA",
        payload: response.data,
      });
      dispatch({ type: "STOP_LOADING" });
    } catch (err) {
      console.log(err);
    }
  };
};

// function to edit publisher's profile data
export const editDataPublisher = (e) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    await timeout(1500);

    try {
      dispatch({
        type: "SUCCES_EDIT_PUBLISHER",
        nextFormComp: false,
      });

      // submitting data through form
      const formData1 = getState().publisher.publisherForm1;
      const formData2 = getState().publisher.publisherForm2;
      const formData = new FormData();

      formData.append("publisher_name", formData1.get("publisher_name"));
      formData.append("address", formData1.get("address"));
      formData.append("publisher_pict", formData2.get("publisher_pict"));
      formData.append(
        "company_sertificate",
        formData1.get("company_sertificate")
      );
      formData.append("npwp_number", formData1.get("npwp_number"));
      formData.append("npwp_pict", formData1.get("npwp_pict"));
      formData.append("bank_account_name", formData2.get("bank_account_name"));
      formData.append(
        "bank_account_number",
        formData2.get("bank_account_number")
      );
      formData.append(
        "bank_account_detail",
        formData2.get("bank_account_detail")
      );
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.patch(apiUrl + "/publisher/edit", formData, config);
      dispatch({ type: "STOP_LOADING" });
    } catch (err) {
      console.log(err);
    }
  };
};

// function to change publisher status
export const doEditIsPublisher = (e) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const config1 = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const isPublisher = new FormData();
      isPublisher.append("is_publisher", "false");
      const setIsPublisher = await axios.patch(
        apiUrl + "/user",
        isPublisher,
        config1
      );
      console.log("ini respose setpub", setIsPublisher);
      dispatch({
        type: "EDIT_ISPUBLISHER",
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// function to delete publisher
export const doDeletePublisher = (props) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(apiUrl + "/publisher/edit", config);
      console.log("ini response", response);

      dispatch({
        type: "DELETE_PUBLISHER_DATA",
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// function to edit publisher data on the first page
export const doEditDataPublisherOne = (e) => {
  return (dispatch) => {
    try {
      dispatch({
        type: "EDIT_FORM_DATA_PUBLISHER",
        payload: new FormData(e),
      });

      dispatch({
        type: "SHOW_NEXT_PUBLISHER_EDIT_FORM",
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// function to edit publisher data on the second page
export const doEditDataPublisherTwo = (e) => {
  return (dispatch) => {
    try {
      dispatch({
        type: "EDIT_FORM_DATA_PUBLISHER_TWO",
        payload: new FormData(e),
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// function to get transaction data in dashboard publisher
export const getAllDataTransaction = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    await timeout(1000);

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const dataTransaction = await axios.get(
        apiUrl + "/transaction/publisher/checkout/history",
        config
      );
      dispatch({
        type: "SET_DATA_TRANSAKSI",
        payload: dataTransaction.data,
      });
      dispatch({ type: "STOP_LOADING" });
    } catch (err) {
      dispatch({
        type: "SET_DATA_TRANSAKSI",
        payload: [],
      });
      console.log(err);
    }
  };
};

export const publisherGetUserCart = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const dataTransaction = await axios.get(
        apiUrl + "/transaction/publisher/user/checkout",
        config
      );
      console.log(apiUrl);
      dispatch({
        type: "SET_DATA_USER_CART",
        payload: dataTransaction.data,
      });
    } catch (err) {
      dispatch({
        type: "SET_DATA_USER_CART",
        payload: [],
      });
      console.log(err);
    }
  };
};

export const approveCartPermission = (cartDetailID) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      console.log("inicart", cartDetailID);

      await axios.patch(
        apiUrl + "/transaction/detail/permission/" + cartDetailID,
        { permission: "diterima" },
        config
      );

      const dataTransaction = await axios.get(
        apiUrl + "/transaction/publisher/user/checkout",
        config
      );

      dispatch({
        type: "SET_DATA_USER_CART",
        payload: dataTransaction.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const declineCartPermission = (cartDetailID) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      console.log("inicart", cartDetailID);

      await axios.patch(
        apiUrl + "/transaction/detail/permission/" + cartDetailID,
        { permission: "ditolak" },
        config
      );

      const dataTransaction = await axios.get(
        apiUrl + "/transaction/publisher/user/checkout",
        config
      );
      dispatch({
        type: "SET_DATA_USER_CART",
        payload: dataTransaction.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
