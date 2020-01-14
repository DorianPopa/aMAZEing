import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Nav from "../../Structure/Nav";
import { Dashboard, Manager, Leaderboards } from "../../Pages";
import { Config } from "../../../base";

const NavigatorUser = () => {
  const PAGES = [
    {
      exact: true,
      route: Config.ROUTE_PAGE_DASHBOARD,
      title: "Dashboard",
      depth: 1,
      component: (props) => <Dashboard {...props} />,
    },
    {
      exact: true,
      route: Config.ROUTE_PAGE_LEADERBOARDS,
      title: "Leaderboards",
      depth: 1,
      component: (props) => <Leaderboards {...props} />,
    },
    {
      exact: true,
      route: Config.ROUTE_PAGE_MAZE_MANAGER_SOLVE,
      title: "Solve Maze",
      depth: 1,
      component: (props) => <Manager {...props} type="solve" />,
    },
    {
      exact: true,
      route: Config.ROUTE_PAGE_MAZE_MANAGER_CREATE,
      title: "Create Maze",
      depth: 1,
      component: (props) => <Manager {...props} type="create" />,
    },
    {
      exact: true,
      route: Config.ROUTE_PAGE_MAZE_MANAGER_VIEW,
      title: "View Maze",
      depth: 1,
      component: (props) => <Manager {...props} type="view" />,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Switch>
        {PAGES.map((element) => (
          <Route
            key={element.route}
            path={element.route}
            render={(props) => element.component({ ...props, title: `${element.title} | aMAZEing` })}
            exact={element.exact}
          />
        ))}
        <Redirect to={Config.ROUTE_PAGE_DASHBOARD} />
      </Switch>

      <Nav />
    </div>
  );
};

export default NavigatorUser;
