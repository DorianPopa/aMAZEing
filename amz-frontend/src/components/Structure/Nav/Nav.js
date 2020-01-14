import React from "react";
import PropTypes from "prop-types";
import typy from "typy";
import { PURGE } from "redux-persist";
import { withRouter, matchPath, Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { ReactComponent as Logo } from "../../../assets/images/logo_white.svg";
import "./Nav.scss";

import { Config } from "../../../base";

import NavMenuDefault from "./NavMenuDefault";
import NavMenuManager from "./NavMenuManager";
import NavMenuVisualizer from "./NavMenuVisualizer";

const Nav = (props) => {
  const { pathname } = props.location;

  console.log(pathname);

  const onLogOut = () => {
    props.dispatch.doLogOut();
    props.history.replace(Config.ROUTE_PAGE_CONNECT);
  };

  const onGoToDashboard = () => {
    props.history.push(Config.ROUTE_PAGE_DASHBOARD);
  };

  return (
    <nav className="Nav">
      <div className="content">
        <Link className="logo" to={Config.ROUTE_PAGE_DASHBOARD}>
          <Logo />
        </Link>
        {[Config.ROUTE_PAGE_DASHBOARD, Config.ROUTE_PAGE_LEADERBOARDS].includes(pathname) ? (
          <NavMenuDefault
            path={pathname}
            user={{
              username: typy(props, "store.user.username").safeString,
              id: typy(props, "store.user.id").safeString,
            }}
            onLogOut={onLogOut}
          />
        ) : matchPath(pathname, { path: Config.ROUTE_PAGE_MAZE_VISUALIZER, exact: true }) !== null ? (
          <NavMenuVisualizer
            user={{
              username: typy(props, "store.user.username").safeString,
              id: typy(props, "store.user.id").safeString,
            }}
            onGoToDashboard={onGoToDashboard}
            onLogOut={onLogOut}
          />
        ) : (
          <NavMenuManager
            isSelf={
              matchPath(pathname, {
                path: Config.ROUTE_PAGE_MAZE_MANAGER_VIEW,
                exact: true,
              }) !== null
            }
            user={{
              username: typy(props, "store.user.username").safeString,
              id: typy(props, "store.user.id").safeString,
            }}
            onLogOut={onLogOut}
          />
        )}
      </div>
    </nav>
  );
};

Nav.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.shape({
    doUserClean: PropTypes.func,
    doLogOut: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
};

Nav.defaultProps = {};

export default compose(
  withRouter,
  connect(
    (store) => {
      return {
        store: {
          user: store.auth.user,
        },
      };
    },
    (dispatch) => {
      return {
        dispatch: {
          doLogOut: () => {
            return dispatch({ type: PURGE, result: () => null });
          },
        },
      };
    },
  ),
)(Nav);
