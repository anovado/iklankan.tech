import axios from "axios";
const apiUrl = process.env.REACT_APP_APIBE_URL;
const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// function to handle user login
export const userLogin = (phoneNumberOrEmail, password) => {
  return async (dispatch) => {
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    await timeout(1500);

    try {
      const response = await axios.post(apiUrl + "/signin", {
        phone: phoneNumberOrEmail,
        password: password,
      });

      dispatch({
        type: "USER_LOGIN",
        payload: response.data.token,
        isLogin: true,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("status", response.data.user_type);
      localStorage.setItem("isLogin", true);
      dispatch({ type: "STOP_LOADING" });
    } catch (err) {
      dispatch({
        type: "USER_LOGIN_FAIL",
        isLogin: false,
      });
      getUserData();
    }
  };
};

// function to handle register new user
export const userRegister = (e) => {
  return async (dispatch, getState) => {
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    await timeout(1500);

    try {
      const form1 = getState().custom.advertiserForm1;
      const form2 = new FormData(e);

      const data = {
        name: form1.get("userFullName"),
        phone: form1.get("phoneNumber"),
        email: form2.get("email"),
        password: form2.get("password"),
      };
      await axios.post(apiUrl + "/user/register", data);
      dispatch({
        type: "USER_REGISTER",
        payload: true,
      });
      dispatch({ type: "STOP_LOADING" });

      getUserData();
    } catch (e) {
      console.error(e);
    }
  };
};

// function to get user's data
export const getUserData = (props) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    // await timeout(1500);

    try {
      const response = await axios.get(apiUrl + "/user/profile", {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "GET_USER_DATA",
        payload: response.data,
      });
      dispatch({ type: "STOP_LOADING" });

      localStorage.setItem("isPublisher", response.data.is_publisher);
    } catch (err) {
      console.log(err);
    }
  };
};

// function to edit user's data
export const editUserData = (e) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    await timeout(1500);

    try {
      dispatch({
        type: "SUCCESS_EDIT_DATA",
      });
      const source = new FormData(e);
      const formData = new FormData();

      formData.append("name", source.get("name"));
      formData.append("address", source.get("address"));
      formData.append("profil_pict", source.get("profil_pict"));
      formData.append("KTP_number", source.get("KTP_number"));
      formData.append("KTP_pict", source.get("KTP_pict"));
      // formData.append("password", source.get("password"));

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.patch(apiUrl + "/user/register", formData, config);
      dispatch({ type: "STOP_LOADING" });
    } catch (err) {
      console.log(err);
    }
  };
};

// function to handle edit password
export const editUserPassword = (props) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    await timeout(1500);

    const password = new FormData();
    password.append("password", getState().user.password);

    try {
      const formData = new FormData();
      formData.append("password", getState().user.password);
      await axios.patch(apiUrl + "/user/profile", password, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "SUCCESS_EDIT_DATA",
      });
      dispatch({ type: "STOP_LOADING" });
    } catch (err) {
      console.log(err);
    }
  };
};

// function to handle input change
export const changeInputUser = (e) => {
  return {
    type: "CHANGE_INPUT_USER",
    payload: e,
  };
};

// function to handle logout
export const doLogOut = (e) => {
  localStorage.removeItem("token");
  localStorage.removeItem("isLogin");
  localStorage.removeItem("isPublisher");
  localStorage.removeItem("status");
  localStorage.removeItem("id_publisher");
  localStorage.removeItem("id_spots");
  return {
    type: "LOGOUT",
    payload: e,
  };
};

// check user login
export const checkUserLogin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    const config = {
      Authorization: `Bearer ${token}`,
    };

    const respon = await axios.get(apiUrl + "/auth", config);

    if (respon.status !== 200) {
      window.localStorage.clear();
      dispatch({
        type: "TOKEN_EXPIRE",
      });
    }
  };
};

// function to register user as publisher
export const doRegisterPublisher = () => {
  return async (dispatch, getState) => {
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    await timeout(1500);

    const formData1 = getState().custom.publisherForm1;
    const formData2 = getState().custom.publisherForm2;

    // input data through form data
    const data = new FormData();
    data.append("publisher_name", formData1.get("publisher_name"));
    data.append("address", formData1.get("address"));
    data.append("npwp_number", formData1.get("npwp_number"));
    data.append("npwp_pict", formData1.get("npwp_pict"));
    data.append("company_sertificate", formData1.get("company_sertificate"));
    data.append("publisher_pict", formData2.get("publisher_pict"));
    data.append("bank_account_name", formData2.get("bank_account_name"));
    data.append("bank_account_number", formData2.get("bank_account_number"));
    data.append("bank_account_detail", formData2.get("bank_account_detail"));

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(apiUrl + "/publisher", data, config);
      console.log("ini response", response);
      const dataPublisher = new FormData();
      dataPublisher.append("is_publisher", "true");
      const setPublisher = await axios.patch(
        apiUrl + "/user",
        dataPublisher,
        config
      );
      console.log("ini response setpub", setPublisher);
      dispatch({
        type: "USER_REGISTER_PUBLISHER",
      });
      dispatch({ type: "STOP_LOADING" });
    } catch (er) {
      alert("tidak berhasil");
    }
  };
};
