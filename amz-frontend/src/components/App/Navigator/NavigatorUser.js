import React from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "../../Structure/Nav";
import { Dashboard, Manager, Leaderboards } from "../../Pages";
import Config from "../../../config/Config";

const NavigatorUser = () => {
  const PAGES = [
    {
      exact: true,
      route: Config.ROUTE_PAGE_DASHBOARD,
      title: "Dashboard",
      depth: 1,
      component: <Dashboard />,
    },
    {
      exact: true,
      route: Config.ROUTE_PAGE_LEADERBOARDS,
      title: "Leaderboards",
      depth: 1,
      component: <Leaderboards />,
    },
    {
      exact: true,
      route: Config.ROUTE_PAGE_MAZE_MANAGER_SOLVE,
      title: "Solve Maze",
      depth: 1,
      component: <Manager type="solve" />,
    },
    {
      exact: true,
      route: Config.ROUTE_PAGE_MAZE_MANAGER_CREATE,
      title: "Create Maze",
      depth: 1,
      component: <Manager type="create" />,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Switch>
        {PAGES.map((element) => (
          <Route key={element.route} path={element.route} render={() => element.component} exact={element.exact} />
        ))}
      </Switch>

      <Nav />
    </div>
  );
};

export default NavigatorUser;
