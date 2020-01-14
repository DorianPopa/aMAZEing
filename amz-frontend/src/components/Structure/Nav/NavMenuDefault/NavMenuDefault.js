import React, { useState } from "react";
import PropTypes from "prop-types";

import { withAlert } from "react-alert";
import { withRouter, Link } from "react-router-dom";
import { compose } from "redux";
import { Config } from "../../../../base";
import { EdgeLeft, EdgeRight } from "../../../Common/Edge/Edge";

import { ProfileModal } from "../../Modal/Template";
import Button from "../../../Common/Button";
import Icon from "../../../Common/Icon";

import "./NavMenuDefault.scss";

const NavMenuDefault = (props) => {
  const [isProfileModalOpen, toggleProfileModal] = useState(false);
  const [isLogOutFired, toggleLogOut] = useState(false);
  return (
    <menu className="NavMenuDefault">
      <Button
        type="edged"
        icon={{
          icon: true,
          source: "loupe",
          family: "round",
        }}
        title="Create maze"
        isEdgeAnimated={false}
        to={Config.ROUTE_PAGE_MAZE_MANAGER_CREATE}
      />
      <div className="content">
        <Link
          className="item"
          to={Config.ROUTE_PAGE_DASHBOARD}
          data-selected={props.path === Config.ROUTE_PAGE_DASHBOARD}
        >
          <div className="content">
            <Icon icon source="business" family="round" />
            <p>Dashboard</p>
          </div>
        </Link>
        <div className="divider" />
        <Link
          className="item"
          to={Config.ROUTE_PAGE_LEADERBOARDS}
          data-selected={props.path === Config.ROUTE_PAGE_LEADERBOARDS}
        >
          <div className="content">
            <Icon icon source="insert_chart_outlined" family="round" />
            <p>Leaderboards</p>
          </div>
        </Link>
        <div
          onClick={() => {
            toggleProfileModal(true);
          }}
          className="item profile"
        >
          <div className="content">
            <EdgeLeft width={10} height={20} />
            <div className="container">
              <Icon icon source="account_circle" family="outlined" />
              <p>{`@${props.user.username}`}</p>
            </div>
            <EdgeRight width={10} height={20} />
          </div>
        </div>

        <EdgeLeft />
        <EdgeRight />
      </div>

      <ProfileModal
        username={props.user.username}
        isOpen={isProfileModalOpen}
        isLogOutFired={isLogOutFired}
        onLogOut={() => {
          if (isLogOutFired) return;
          toggleLogOut(true);
          props.alert.show("Sorry to see you go :(.", { type: "warn", timeout: 5000, isClosable: false });
          setTimeout(() => {
            props.alert.removeAll();
            props.onLogOut();
          }, 3000);
        }}
        onClose={toggleProfileModal}
      />
    </menu>
  );
};

NavMenuDefault.propTypes = {
  path: PropTypes.string,
  user: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.string,
  }),
  alert: PropTypes.shape({
    show: PropTypes.func,
    removeAll: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  onLogOut: PropTypes.func.isRequired,
};
NavMenuDefault.defaultProps = {
  path: Config.ROUTE_PAGE_DASHBOARD,
  user: {
    username: "Visitor",
    id: "",
  },
};

export default compose(withRouter, withAlert())(NavMenuDefault);
