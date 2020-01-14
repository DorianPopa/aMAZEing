import React from "react";
import PropTypes from "prop-types";
import ManagerCreate from "./ManagerCreate";
import ManagerView from "./ManagerView";
import ManagerSolve from "./ManagerSolve";

const Manager = (props) => {
  switch (props.type) {
    case "view":
      return <ManagerView {...props} />;
    case "solve":
      return <ManagerSolve {...props} />;
    case "create":
    default:
      return <ManagerCreate {...props} />;
  }
};

Manager.propTypes = {
  type: PropTypes.oneOf(["create", "solve", "view"]),
};

Manager.defaultProps = {
  type: "create",
};

export default Manager;
