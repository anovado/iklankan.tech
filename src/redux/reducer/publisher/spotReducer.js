const initialState = {
  statusError: true,
  spots: [],
  spotsId: [],
  images: [],
  price: [],
  allSpots: [],
  searchSpot: [],
  category: [],
  allCategories: [],
  // isLoading: false,
};

export default function spotReducer(spotState = initialState, action) {
  switch (action.type) {
    // case "ACTIVATE_LOADING":
    //   return {
    //     ...spotState,
    //     isLoading: true,
    //   };

    case "DELETE_PRODUCT_PUBLISHER":
      return {
        ...spotState,
        statusError: false,
        deleted: true,
        // isLoading: false,
      };
    case "GET_PRODUCT_PUBLISHER":
      return {
        ...spotState,
        spots: action.payload,
        deleted: false,
        // isLoading: false,
      };
    case "REQUEST_LIST_PRODUCT_DETAILS":
      return {
        ...spotState,
        spotsId: action.payload,
        images: JSON.parse(action.payload.images),
        price: action.price,
      };
    case "GET_ALL_PRODUCT":
      return {
        ...spotState,
        allSpots: action.payload,
        searchSpot: [],
      };
    case "GET_BY_CATEGORY":
      return {
        ...spotState,
        searchSpot: action.payload,
        // isLoading: false,
      };
    case "GET_SEARCH_DATA":
      return {
        ...spotState,
        searchSpot: action.payload,
        // isLoading: false,
      };
    case "GET_CATEGORY_BY_ID":
      return {
        ...spotState,
        category: action.payload,
      };
    case "GET_ALL_CATEGORY":
      return {
        ...spotState,
        allCategories: action.payload,
      };
    case "EDIT_STATUS_SPOT":
      return {
        ...spotState,
      };
    default:
      return spotState;
  }
}
