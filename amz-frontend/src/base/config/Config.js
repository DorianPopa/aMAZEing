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

  static ROUTE_PAGE_MAZE_MANAGER_VIEW = `${Config.ROUTE_PAGE_MAZE_VIEWER_CLEAN}manager/:id/view`;

  static ROUTE_PAGE_MAZE_VISUALIZER = `${Config.ROUTE_PAGE_MAZE_VIEWER_CLEAN}manager/:id/visualize/:type`;

  static ROUTE_BUILDER_PAGE_MAZE_MANAGER_SOLVE = (id) => `${Config.ROUTE_PAGE_MAZE_VIEWER_CLEAN}manager/${id}/solve`;

  static ROUTE_BUILDER_PAGE_MAZE_MANAGER_VIEW = (id) => `${Config.ROUTE_PAGE_MAZE_VIEWER_CLEAN}manager/${id}/view`;

  static ROUTE_BUILDER_PAGE_MAZE_VISUALIZER = (id, type) =>
    `${Config.ROUTE_PAGE_MAZE_VIEWER_CLEAN}manager/${id}/visualize/${type}`;

  // ----------- REDUX ACTIONS -------------- //

  static REDUX_ACTION_TEST = "REDUX_ACTION_TEST";

  static REDUX_ACTION = {
    USER_SET_TOKEN: "USER_SET_TOKEN",
    USER_SET_ID: "USER_SET_ID",
    USER_SET_USERNAME: "USER_SET_USERNAME",
    USER_CLEAN: "USER_CLEAN",

    PROFILE_SET: "USER_SET_PROFILE",
    PROFILE_SET_MAZES: "USER_SET_MAZES",
    PROFILE_SET_MAZES_SELF: "USER_SET_MAZES_SELF",
    PROFILE_SET_MAZES_PLAYGROUND: "USER_SET_MAZES_PLAYGROUND",

    FLAG_SET_LOADING_PROFILE: "FLAG_SET_LOADING_PROFILE",
    FLAG_SET_LOADING_MAZES: "FLAG_SET_LOADING_MAZES",
    FLAG_SET_LOADING_MAZES_SELF: "FLAG_SET_LOADING_MAZES_SELF",
    FLAG_SET_LOADING_MAZES_PLAYGROUND: "FLAG_SET_LOADING_MAZES_PLAYGROUND",
  };

  // ----------- SAGAS ACTIONS -------------- //

  static SAGA_ACTION = {
    USER_FETCH_PROFILE: "USER_FETCH_PROFILE",
    USER_FETCH_MAZES: "USER_FETCH_MAZES",
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
    REGISTER: () => `${Config.API_ROOT}/users`,
    LOGIN: () => `${Config.API_ROOT}/login`,

    USER_PROFILE: (id) => `${Config.API_ROOT}/users/${id}`,

    MAZES: () => `${Config.API_ROOT}/mazes/`,
    MAZES_SELF: () => `${Config.API_ROOT}/?/`, // DEPRECATED
    MAZES_PLAYGROUND: () => `${Config.API_ROOT}/?/`, // DEPRECATED

    MAZE_CREATE: (uId) => `${Config.API_ROOT}/users/${uId}/build/save`,

    MAZE_PROFILE: (id) => `${Config.API_ROOT}/mazes/${id}`,
    MAZE_SOLVE_BFS: (uId) => `${Config.API_ROOT}/users/${uId}/build/visualize/bfs`,
    MAZE_SOLVE_BIDIRECTIONAL_BFS: (uId) => `${Config.API_ROOT}/users/${uId}/build/visualize/bidirectional-bfs`,
    MAZE_SOLVE_ASTAR: (uId) => `${Config.API_ROOT}/users/${uId}/build/visualize/a-star`,

    MAZE_PLAIN_SOLUTION: (mId) => `${Config.API_ROOT}/mazes/${mId}/solution`,
    MAZE_USER_SOLUTION: (mId) => `${Config.API_ROOT}/mazes/${mId}/user-solution`,

    MAZE_SUBMIT_SOLUTION: (mId) => `${Config.API_ROOT}/mazes/${mId}/submit`,

    LEADERBOARD: () => `${Config.API_ROOT}/leaderboard/`,
  };

  static SOLUTION_ALGORIGHM = {
    BFS: "BFS",
    BIDIRECTIONAL_BFS: "BIDIRECTIONAL_BFS",
    ASTAR: "ASTAR",
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
    START: 1,
    FINISH: 2,
    SIMPLE: 3,
    SOLUTION: 4,
    SELF: 5,
  };
}

export default Config;
