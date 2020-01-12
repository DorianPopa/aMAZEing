import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Connect } from "../../Pages";
import { Config } from "../../../base";

const NavigatorUser = () => {
  const PAGES = [
    {
      exact: true,
      route: Config.ROUTE_PAGE_CONNECT,
      title: "Connect",
      depth: 1,
      component: (props) => <Connect {...props} type={Config.CONNECT_TYPE.LOGIN} />,
    },
    {
      exact: true,
      route: Config.ROUTE_PAGE_CONNECT_REGISTER,
      title: "Register",
      depth: 1,
      component: (props) => <Connect {...props} type={Config.CONNECT_TYPE.REGISTER} />,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Switch>
        {PAGES.map((element) => (
          <Route
            key={element.route}
            path={element.route}
            render={(props) => element.component(props)}
            exact={element.exact}
          />
        ))}
        <Redirect to={Config.ROUTE_PAGE_CONNECT} />
      </Switch>
    </div>
  );
};

export default NavigatorUser;
