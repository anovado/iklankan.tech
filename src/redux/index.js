import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducer/userReducer";
import publisherReducer from "./reducer/publisher/publisherReducer";
import spotReducer from "./reducer/publisher/spotReducer";
import customReducer from "./reducer/customReducer";
import transactionReducer from "./reducer/transactionReducer";
import userAdminReducer from "./reducer/admin/userAdminReducer";
import publisherAdminReducer from "./reducer/admin/publisherAdminReducer";
import spotAdminReducer from "./reducer/admin/spotAdminReducer";

const rootReducer = combineReducers({
  user: userReducer,
  publisher: publisherReducer,
  control: spotReducer,
  custom: customReducer,
  transaction: transactionReducer,
  adminUser: userAdminReducer,
  adminPublisher : publisherAdminReducer,
  adminSpot : spotAdminReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => {
  console.log(store.getState());
});

export default store;
