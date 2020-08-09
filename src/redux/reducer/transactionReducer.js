const initialState = {
  date: "",
  duration: 1,
  statusError: true,
  dataCart: [],
  transToken: "",
  dataTransaction: [],
  // isLoading: false,
};

export default function transactionReducer(
  transactionState = initialState,
  action
) {
  switch (action.type) {
    // case "ACTIVATE_LOADING":
    //   return {
    //     ...transactionState,
    //     isLoading: true,
    //   };
    case "GET_SELECTED_DATE":
      return {
        ...transactionState,
        date: action.payload,
      };
    case "GET_DURATION":
      return {
        ...transactionState,
        duration: action.payload,
      };
    case "CHANGE_INPUT":
      return {
        ...transactionState,
        [action.payload.target.name]: action.payload.target.value,
      };
    case "SUCCESS_POST_TRANSACTION":
      return {
        ...transactionState,
        statusError: false,
        // isLoading: false,
      };
    case "SUCCESS_GET_TRANSACTION":
      return {
        ...transactionState,
        dataCart: action.payload,
        deleted: false,
      };
    case "SUCCESS_CHECKOUT":
      return {
        ...transactionState,
      };

    case "SET_MIDTRANS_TOKEN":
      return {
        ...transactionState,
        transToken: action.payload,
      };

    case "SET_DATA_TRANSACTION":
      return {
        ...transactionState,
        dataTransaction: action.payload,
        // isLoading: false,
      };

    case "DELETE_CART":
      return {
        ...transactionState,
        dataTransaction: action.payload,
        deleted: true,
      };

    default:
      return transactionState;
  }
}
