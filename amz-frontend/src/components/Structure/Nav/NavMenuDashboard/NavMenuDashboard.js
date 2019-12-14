import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../../../Common/Button";
import { EdgeLeft, EdgeRight } from "../../../Common/Edge/Edge";
import Icon from "../../../Common/Icon";
import Config from "../../../../config/Config";

import "./NavMenuDashboard.scss";

const NavMenuDashboard = (props) => {
  return (
    <menu className="NavMenuDashboard">
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
        <Link className="item" to={Config.ROUTE_PAGE_DASHBOARD}>
          <div className="content">
            <Icon icon source="business" family="round" />
            <p>Dashboard</p>
          </div>
        </Link>
        <div className="divider" />
        <Link className="item" to={Config.ROUTE_PAGE_LEADERBOARDS}>
          <div className="content">
            <Icon icon source="insert_chart_outlined" family="round" />
            <p>Leaderboards</p>
          </div>
        </Link>
        <Link className="item profile" to={`${Config.ROUTE_PAGE_PROFILE_CLEAN}${props.user.id}`}>
          <div className="content">
            <EdgeLeft width={10} height={20} />
            <div className="container">
              <Icon icon source="account_circle" family="outlined" />
              <p>{`@${props.user.username}`}</p>
            </div>
            <EdgeRight width={10} height={20} />
          </div>
        </Link>

        <EdgeLeft />
        <EdgeRight />
      </div>
    </menu>
  );
};

NavMenuDashboard.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.string,
  }),
};
NavMenuDashboard.defaultProps = {
  user: {
    username: "Visitor",
    id: "",
  },
};

export default NavMenuDashboard;
