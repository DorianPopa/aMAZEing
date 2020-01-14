import { combineReducers } from "redux";
import { PURGE } from "redux-persist";
import Config from "../../config";

const initialProfile = {
  score: "0",
  mazeCount: 0,
  mazePlayers: 0,
  mazesSelf: [],
  mazesPlayground: [],

  flagProfile: false,
  flagMazes: false,
  flagMazesSelf: false,
  flagMazesPlayground: false,
};

const profile = (state = initialProfile, action) => {
  switch (action.type) {
    case Config.REDUX_ACTION.PROFILE_SET: {
      const { score, mazeCount, mazePlayers } = action.payload;
      return { ...state, score, mazeCount, mazePlayers };
    }
    case Config.REDUX_ACTION.PROFILE_SET_MAZES_PLAYGROUND:
      return { ...state, mazesPlayground: action.payload.list };

    case Config.REDUX_ACTION.PROFILE_SET_MAZES_SELF:
      return { ...state, mazesSelf: action.payload.list };

    case Config.REDUX_ACTION.FLAG_SET_LOADING_PROFILE:
      return { ...state, flagProfile: action.payload.flag };
    case Config.REDUX_ACTION.FLAG_SET_LOADING_MAZES:
      return { ...state, flagMazes: action.payload.flag };
    case Config.REDUX_ACTION.FLAG_SET_LOADING_MAZES_SELF:
      return { ...state, flagMazesSelf: action.payload.flag };
    case Config.REDUX_ACTION.FLAG_SET_LOADING_MAZES_PLAYGROUND:
      return { ...state, flagMazesPlayground: action.payload.flag };
    case PURGE:
      return {};
    default:
      return state;
  }
};

const DataReducer = combineReducers({
  profile,
});

export default DataReducer;
