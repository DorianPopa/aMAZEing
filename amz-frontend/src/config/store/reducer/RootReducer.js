import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import DataReducer from "./DataReducer";
import RequestReducer from "./RequestReducer";

const RootReducer = combineReducers({
  auth: AuthReducer,
  data: DataReducer,
  request: RequestReducer,
});

export default RootReducer;
