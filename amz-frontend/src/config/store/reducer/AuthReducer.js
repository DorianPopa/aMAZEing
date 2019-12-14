import { combineReducers } from "redux";
import Config from "../../Config";

const initialUser = {
  onBoarded: false,
};

const user = (state = initialUser, action) => {
  switch (action.type) {
    case Config.REDUX_ACTION_TEST: {
      return { ...state, credentials: action.payload.credentials };
    }

    default:
      return state;
  }
};

const AuthReducer = combineReducers({
  user,
});

export default AuthReducer;
