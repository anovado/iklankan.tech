const initialState = {
  spotList: [],
  spoyById: [],
  spotImages: [],
  price: [],
  // isLoading: false,
};

const spotAdminReducer = (spotState = initialState, action) => {
  switch (action.type) {
    // case "ACTIVATE_LOADING":
    //   return {
    //     ...spotState,
    //     isLoading: true,
    //   };
    case "GET_SPOT_DATA":
      return {
        ...spotState,
        spotList: action.payload,
        deleted: false,
        // isLoading: false,
      };
    case "GET_SPOT_BY_ID":
      return {
        ...spotState,
        spoyById: action.payload,
        spotImages: action.images,
        price: action.price,
      };
    case "DELETE_SPOT_ADMIN":
      return {
        ...spotState,
        deleted: true,
      };
    default:
      return {
        ...spotState,
      };
  }
};
export default spotAdminReducer;
