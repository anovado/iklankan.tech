const initialState = {
  userList: [],
  // isLoading: false,
};

const userAdminReducer = (userAdminState = initialState, action) => {
  switch (action.type) {
    // case "ACTIVATE_LOADING":
    //   return {
    //     ...userAdminState,
    //     isLoading: true,
    //   };
    case "GET_USER_ADMIN":
      return {
        ...userAdminState,
        userList: action.payload,
        deleted: false,
        // isLoading: false,
      };
    case "DELETE_USER_DATA":
      return {
        ...userAdminState,
        deleted: true,
      };
    case "CHANGE_IS_PUBLISHER":
      return {
        ...userAdminState,
      };
    default:
      return {
        ...userAdminState,
      };
  }
};
export default userAdminReducer;
