const initialPublisherState = {
  dataPublisher: [],
  nextFormComp: false,
  publisherForm1: {},
  advertiserForm1: {},
  dataTransaksi: [],
  dataUSerCart: [],
  // isLoading: false,
};

const publisherReducer = (publisherState = initialPublisherState, action) => {
  switch (action.type) {
    // case "ACTIVATE_LOADING":
    //   return {
    //     ...publisherState,
    //     isLoading: true,
    //   };
    case "GET_PUBLISHER_DATA":
      return {
        ...publisherState,
        dataPublisher: action.payload,
        nextFormComp: false,
        // isLoading: false,
      };
    case "SUCCESS_EDIT_PUBLISHER":
      return {
        ...publisherState,
        nextFormComp: false,
        // isLoading: false,
      };
    case "EDIT_FORM_DATA_PUBLISHER":
      return {
        ...publisherState,
        publisherForm1: action.payload,
      };
    case "EDIT_FORM_DATA_PUBLISHER_TWO":
      return {
        ...publisherState,
        publisherForm2: action.payload,
      };
    case "SHOW_NEXT_PUBLISHER_EDIT_FORM":
      return {
        ...publisherState,
        nextFormComp: true,
      };
    case "DELETE_PUBLISHER_DATA":
      return {
        ...publisherState,
      };
    case "EDIT_ISPUBLISHER":
      return {
        ...publisherState,
      };
    case "SET_DATA_TRANSAKSI":
      return {
        ...publisherState,
        dataTransaksi: action.payload,
        // isLoading: false,
      };
    case "SET_DATA_USER_CART":
      return {
        ...publisherState,
        dataUSerCart: action.payload,
      };
    default:
      return {
        ...publisherState,
      };
  }
};

export default publisherReducer;
