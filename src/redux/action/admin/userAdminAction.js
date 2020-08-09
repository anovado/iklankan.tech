import axios from "axios";
const apiUrl = process.env.REACT_APP_APIBE_URL;
const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// get data user for admin control
export const getUserForAdmin = (props) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    // loading transition
    await dispatch({ type: "ACTIVATE_LOADING" });
    await timeout(1000);

    try {
      const response = await axios.get(apiUrl + "/user?user_type=user", {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "GET_USER_ADMIN",
        payload: response.data,
      });
      dispatch({ type: "STOP_LOADING" });
    } catch (error) {
      console.log(error);
    }
  };
};

// admin delete user data
export const doDeleteUser = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(apiUrl + "/user/" + id, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      getUserForAdmin();

      dispatch({
        type: "DELETE_USER_DATA",
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// admin chang ispubliher become false
export const doChangeIsPublisher = (user_id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("is_publisher", "false");
      await axios.patch(apiUrl + "/user/admin/" + user_id, formData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "CHANGE_IS_PUBLISHER",
      });
    } catch (error) {
      console.log(error);
    }
  };
};
