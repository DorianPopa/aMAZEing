import React from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { ReactComponent as Logo } from "../../../assets/images/logo_white.svg";
import "./Nav.scss";

import Config from "../../../config/Config";
import NavMenuDashboard from "./NavMenuDashboard/NavMenuDashboard";
import NavMenuManager from "./NavMenuManager/NavMenuManager";

const Nav = (props) => {
  const { pathname } = props.location;

  console.log(pathname);

  return (
    <nav className="Nav">
      <div className="content">
        <Link className="logo" to={Config.ROUTE_PAGE_DASHBOARD}>
          <Logo />
        </Link>
        {pathname === Config.ROUTE_PAGE_DASHBOARD ? (
          <NavMenuDashboard user={{ username: "player123", id: "AB1" }} />
        ) : (
          <NavMenuManager self user={{ username: "player123", id: "AB1" }} />
        )}
      </div>
    </nav>
  );
};

Nav.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

Nav.defaultProps = {};

export default compose(withRouter, connect(null, null))(Nav);
