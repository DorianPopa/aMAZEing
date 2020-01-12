import React from "react";
import PropTypes from "prop-types";
import typy from "typy";
import { PURGE } from "redux-persist";
import { withRouter, Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { ReactComponent as Logo } from "../../../assets/images/logo_white.svg";
import "./Nav.scss";

import { Config } from "../../../base";

import NavMenuDefault from "./NavMenuDefault";
import NavMenuManager from "./NavMenuManager";

const Nav = (props) => {
  const { pathname } = props.location;

  console.log(pathname);

  const onLogOut = () => {
    props.dispatch.doLogOut();
    props.history.replace(Config.ROUTE_PAGE_CONNECT);
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
        ) : (
          <NavMenuManager
            self
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
