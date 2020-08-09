// functoin to handle change input in form input
export const handleChange = (e) => {
  return {
    type: "CHANGE_INPUT_USER",
    payload: e,
  };
};

// function to handle input file from local
export const handleFileChange = (e) => {
  return {
    type: "CHANGE_FILE_INPUT",
    payload: e,
  };
};

// function to send data through form data to backend side
export const saveRegisterFormData = (e) => {
  return (dispatch) => {
    dispatch({
      type: "SAVE_FORM_DATA_ADVERTISER",
      payload: new FormData(e),
    });
    dispatch({
      type: "SHOW_NEXT",
      payload: true,
    });
  };
};

// function to save data inputted on the first part of the form
export const doValidateFormRegisterPublisherOne = (e) => {
  // e.prepreventDefault();
  return (dispatch) => {
    dispatch({
      type: "SAVE_FORM_DATA_PUBLISHER",
      payload: new FormData(e),
    });

    dispatch({
      type: "SHOW_NEXT_PUBLISHER_FORM",
    });
  };
};

// function to submit data inputted on the second part of the form
export const doValidateFormRegisterPublisherTwo = (e) => {
  // e.prepreventDefault();
  return (dispatch) => {
    dispatch({
      type: "SAVE_FORM_DATA_PUBLISHER_TWO",
      payload: new FormData(e),
    });
  };
};

// function to show alert with snackbar
export const showAlert = () => {
  return {
    type: "SHOW_ALERT",
    alert: {
      show: true,
      message: "Username atau Password Salah!!",
      type: "error",
    },
  };
};

// function to show custom alert with snackbar
export const showAlertCustom = (msg, type) => {
  return {
    type: "SHOW_ALERT",
    alert: {
      show: true,
      message: msg,
      type: type,
      vertical: "top",
      horizontal: "center",
    },
  };
};

// function to enable hide alert
export const hideAlert = () => {
  return {
    type: "HIDE_ALERT",
    alert: {
      show: false,
      message: "",
      type: "",
    },
  };
};
