const initialCustomState = {
  nextComp: false,
  showSnackBar: false,
  clearSnackBar: false,
  nextFormComp: false,
  alert: {
    show: false,
    message: "",
    type: "",
  },
  publisherForm1: {},
  advertiserForm1: {},
  provinsi: [],
  kabupaten: [],
  kecamatan: [],
  kelurahan: [],
};

const customReducer = (customState = initialCustomState, action) => {
  switch (action.type) {
    case "CHANGE_INPUT_USER":
      return {
        ...customState,
        [action.payload.target.name]: action.payload.target.value,
      };

    case "CHANGE_FILE_INPUT":
      return {
        ...customState,
        [action.payload.target.name]: action.payload.target.files[0],
      };
    case "SHOW_NEXT":
      return {
        ...customState,
        nextComp: action.payload,
      };
    case "SHOW_SNACKBAR":
      return {
        ...customState,
        showSnackBar: action.payload,
      };

    case "SAVE_FORM_DATA_PUBLISHER":
      return {
        ...customState,
        publisherForm1: action.payload,
      };
    case "SAVE_FORM_DATA_PUBLISHER_TWO":
      return {
        ...customState,
        publisherForm2: action.payload,
      };
    case "SAVE_FORM_DATA_ADVERTISER":
      return {
        ...customState,
        advertiserForm1: action.payload,
      };

    case "SHOW_NEXT_PUBLISHER_FORM":
      return {
        ...customState,
        nextFormComp: true,
      };
    case "SHOW_ALERT":
      return {
        ...customState,
        alert: action.alert,
      };
    case "HIDE_ALERT":
      return {
        ...customState,
        alert: action.alert,
      };
    default:
      return {
        ...customState,
      };
  }
};

export default customReducer;
