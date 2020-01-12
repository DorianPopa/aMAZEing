import style from "./Config.scss";

class Config {
  // ----------- ROUTES -------------- //

  static ROUTE_PAGE_CONNECT = "/connect";

  static ROUTE_PAGE_CONNECT_REGISTER = "/connect/register";

  static ROUTE_PAGE_DASHBOARD = "/";

  static ROUTE_PAGE_LEADERBOARDS = "/leaderboards/";

  static ROUTE_PAGE_PROFILE_CLEAN = "/profile/";

  static ROUTE_PAGE_PROFILE = `${Config.ROUTE_PAGE_PROFILE_CLEAN}:id`;

  static ROUTE_PAGE_MAZE_VIEWER_CLEAN = "/maze/";

  static ROUTE_PAGE_MAZE_VIWER = `${Config.ROUTE_PAGE_MAZE_VIEWER_CLEAN}:id/`;

  static ROUTE_PAGE_MAZE_MANAGER_CREATE = `${Config.ROUTE_PAGE_MAZE_VIEWER_CLEAN}manager/`;

  static ROUTE_PAGE_MAZE_MANAGER_EDIT = `${Config.ROUTE_PAGE_MAZE_VIEWER_CLEAN}manager/:id/edit`;

  static ROUTE_PAGE_MAZE_MANAGER_SOLVE = `${Config.ROUTE_PAGE_MAZE_VIEWER_CLEAN}manager/:id/solve`;

  // ----------- REDUX ACTIONS -------------- //

  static REDUX_ACTION_TEST = "REDUX_ACTION_TEST";

  static REDUX_ACTION = {
    USER_SET_TOKEN: "USER_SET_TOKEN",
    USER_SET_ID: "USER_SET_ID",
    USER_SET_USERNAME: "USER_SET_USERNAME",
    USER_CLEAN: "USER_CLEAN",

    PROFILE_SET: "USER_SET_PROFILE",
    PROFILE_SET_MAZES_SELF: "USER_SET_MAZES_SELF",
    PROFILE_SET_MAZES_PLAYGROUND: "USER_SET_MAZES_PLAYGROUND",

    FLAG_SET_LOADING_PROFILE: "FLAG_SET_LOADING_PROFILE",
    FLAG_SET_LOADING_MAZES_SELF: "FLAG_SET_LOADING_MAZES_SELF",
    FLAG_SET_LOADING_MAZES_PLAYGROUND: "FLAG_SET_LOADING_MAZES_PLAYGROUND",
  };

  // ----------- SAGAS ACTIONS -------------- //

  static SAGA_ACTION = {
    USER_FETCH_PROFILE: "USER_FETCH_PROFILE",
    USER_FETCH_MAZES_SELF: "USER_FETCH_MAZES_SELF",
    USER_FETCH_MAZES_PLAYGROUND: "USER_FETCH_MAZES_PLAYGROUND",
  };

  // ----------- APP CONSTANTS -------------- //

  static HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUHTORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  };

  static API_ROOT = "https://amazeing.azurewebsites.net";

  static API = {
    REGISTER: `${Config.API_ROOT}/users`,
    LOGIN: `${Config.API_ROOT}/login`,

    USER_PROFILE: `${Config.API_ROOT}/users/`,

    MAZES_SELF: `${Config.API_ROOT}/?/`, // TODO MAZES_SELF ROUTE
    MAZES_PLAYGROUND: `${Config.API_ROOT}/?/`, // TODO MAZES_PLAYGROUND ROUTE
  };

  static CONNECT_TYPE = {
    LOGIN: "login",
    REGISTER: "register",
  };

  static theme = {
    ...style,
  };

  static BLOCK_TYPE = {
    FORBIDDEN: -1,
    EMPTY: 0,
    SIMPLE: 1,
    START: 2,
    FINISH: 3,
    SOLUTION: 4,
  };
}

export default Config;