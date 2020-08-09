const initialState = {
  publisherRequest: [],
  publisherList: [],
  publisherById: [],
  // isLoading: false,
};

const publisherAdminReducer = (publisherAdminState = initialState, action) => {
  switch (action.type) {
    // case "ACTIVATE_LOADING":
    //   return {
    //     ...publisherAdminState,
    //     isLoading: true,
    //   };
    case "GET_PUBLISHER_REQUEST":
      return {
        ...publisherAdminState,
        publisherRequest: action.payload,
        deleted: false,
        // isLoading: false,
      };
    case "GET_PUBLISHER_LIST":
      return {
        ...publisherAdminState,
        publisherList: action.payload,
        // isLoading: false,
      };
    case "GET_PUBLISHER_BY_ID":
      return {
        ...publisherAdminState,
        publisherById: action.payload,
      };
    case "IS_AUTHORIZED_PUBLISHER":
      return {
        ...publisherAdminState,
      };

    case "DELETE_PUBLISHER":
      return {
        ...publisherAdminState,
        deleted: true,
      };
    default:
      return {
        ...publisherAdminState,
      };
  }
};
export default publisherAdminReducer;
