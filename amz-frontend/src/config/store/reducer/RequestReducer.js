import { combineReducers } from "redux";

const initialRequest = {
  maze: {
    loading: false,
    status: null,
  },
};

const request = (state = initialRequest, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const RequestReducer = combineReducers({
  request,
});

export default RequestReducer;
