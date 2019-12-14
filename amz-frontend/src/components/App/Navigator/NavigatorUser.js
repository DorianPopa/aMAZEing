import React from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "../../Structure/Nav";
import { Dashboard, Manager } from "../../Pages";
import Config from "../../../config/Config";

const NavigatorUser = () => {
  const PAGES = [
    {
      exact: true,
      route: Config.ROUTE_PAGE_DASHBOARD,
      title: "Dashboard",
      depth: 1,
      component: () => Dashboard,
    },
    {
      exact: false,
      route: Config.ROUTE_PAGE_MAZE_MANAGER_CREATE,
      title: "Create Maze",
      depth: 1,
      component: () => Manager,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Switch>
        {PAGES.map((element) => (
          <Route key={element.route} path={element.route} component={element.component()} exact={element.exact} />
        ))}
      </Switch>

      <Nav />
    </div>
  );
};

export default NavigatorUser;
