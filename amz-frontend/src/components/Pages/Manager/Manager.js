import React from "react";
import PropTypes from "prop-types";
import ManagerCreate from "./ManagerCreate";
import ManagerSolve from "./ManagerSolve";

const Manager = (props) => {
  switch (props.type) {
    case "solve":
      return <ManagerSolve />;
    case "create":
    default:
      return <ManagerCreate />;
  }
};

Manager.propTypes = {
  type: PropTypes.oneOf(["create", "solve"]),
};

Manager.defaultProps = {
  type: "create",
};

export default Manager;
