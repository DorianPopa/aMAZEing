import { combineReducers } from "redux";
import Config from "../../Config";

const initialMaze = {
  test: 0,
};

const maze = (state = initialMaze, action) => {
  switch (action.type) {
    case Config.REDUX_ACTION_TEST:
      return { ...state, test: state.test + 1 };

    default:
      return state;
  }
};

const DataReducer = combineReducers({
  maze,
});

export default DataReducer;
