import style from "./Config.scss";

class Config {
  static ROUTE_PAGE_DASHBOARD = "/";

  static ROUTE_PAGE_LEADERBOARDS = "/leaderboards/";

  static ROUTE_PAGE_PROFILE_CLEAN = "/profile/";

  static ROUTE_PAGE_PROFILE = `${Config.ROUTE_PAGE_PROFILE_CLEAN}:id`;

  static ROUTE_PAGE_MAZE_VIEWER_CLEAN = "/maze/";

  static ROUTE_PAGE_MAZE_VIWER = `${Config.ROUTE_PAGE_MAZE_VIEWER_CLEAN}:id/`;

  static ROUTE_PAGE_MAZE_MANAGER_CREATE = `${Config.ROUTE_PAGE_MAZE_VIEWER_CLEAN}manager/`;

  static ROUTE_PAGE_MAZE_MANAGER_EDIT = `${Config.ROUTE_PAGE_MAZE_VIEWER_CLEAN}manager/:id/edit`;

  static REDUX_ACTION_TEST = "REDUX_ACTION_TEST";

  static theme = {
    ...style,
  };
}

export default Config;
