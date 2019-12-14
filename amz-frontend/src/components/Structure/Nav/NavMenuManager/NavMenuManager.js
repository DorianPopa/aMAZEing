import React from "react";
import PropTypes from "prop-types";
import Button from "../../../Common/Button";

import "./NavMenuManager.scss";

const NavMenuManager = (props) => {
  return (
    <menu className="NavMenuManager">
      <Button
        type="edged"
        theme="delete"
        icon={{
          icon: true,
          source: "delete_sweep",
          family: "outlined",
        }}
        isEdgeAnimated={false}
      />
      <Button
        type="edged"
        theme="light"
        icon={{
          icon: true,
          source: "close",
          family: "round",
        }}
        title="Cancel changes"
        isEdgeAnimated={false}
      />

      <Button
        type="edged"
        icon={{
          icon: true,
          source: "check",
          family: "round",
        }}
        title="Save maze"
        isEdgeAnimated={false}
      />

      <Button
        type="edged"
        theme="dark"
        icon={{
          icon: true,
          source: "account_circle",
          family: "round",
        }}
        title={`@${props.user.username}`}
        isEdgeAnimated={false}
      />
    </menu>
  );
};

NavMenuManager.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.string,
  }),
};
NavMenuManager.defaultProps = {
  user: {
    username: "Visitor",
    id: "",
  },
};

export default NavMenuManager;
