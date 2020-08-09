const initialUserState = {
  token: "",
  isLogin: false,
  userIsRegister: false,
  userIsRegisterPublisher: false,
  profile: [],
  alert: {
    show: false,
    message: "",
    type: "",
  },
  statusError: true,
  isLoading: false,
};

const userReducer = (userState = initialUserState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...userState,
        token: action.payload,
        isLogin: action.isLogin,
        // isLoading: false,
      };

    case "USER_LOGIN_FAIL":
      return {
        ...userState,
        isLogin: action.isLogin,
        alert: action.alert,
        // isLoading: false,
      };

    case "ACTIVATE_LOADING":
      return {
        ...userState,
        isLoading: true,
      };

    case "STOP_LOADING":
      return {
        ...userState,
        isLoading: false,
      };

    case "LOGOUT":
      return {
        ...userState,
        isLogin: false,
      };

    case "USER_REGISTER":
      return {
        ...userState,
        userIsRegister: action.payload,
        // isLoading: false,
      };

    case "CHANGE_INPUT_USER":
      return {
        ...userState,
        [action.payload.target.name]: action.payload.target.value,
      };

    case "GET_USER_DATA":
      return {
        ...userState,
        profile: action.payload,
        // isLoading: false,
      };

    case "SUCCESS_EDIT_DATA":
      return {
        ...userState,
        statusError: false,
        // isLoading: false,
      };

    case "TOKEN_EXPIRE":
      return {
        ...userState,
        isLogin: false,
      };

    case "USER_REGISTER_PUBLISHER":
      return {
        ...userState,
        userIsRegisterPublisher: true,
        // isLoading: false,
      };

    default:
      return {
        ...userState,
      };
  }
};

export default userReducer;
