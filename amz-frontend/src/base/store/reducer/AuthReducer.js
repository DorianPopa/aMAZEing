import { combineReducers } from "redux";
import { PURGE } from "redux-persist";
import Config from "../../config";

const initialUser = {
  id: null,
  token: null,
  username: null,
};

const user = (state = initialUser, action) => {
  switch (action.type) {
    case Config.REDUX_ACTION.USER_SET_ID: {
      return { ...state, id: action.payload.id };
    }
    case Config.REDUX_ACTION.USER_SET_USERNAME: {
      return { ...state, username: action.payload.username };
    }
    case Config.REDUX_ACTION.USER_SET_TOKEN: {
      return { ...state, token: action.payload.token };
    }
    case Config.REDUX_ACTION.USER_CLEAN: {
      return { ...state, ...initialUser };
    }
    case PURGE:
      return {};

    default:
      return state;
  }
};

const AuthReducer = combineReducers({
  user,
});

export default AuthReducer;
