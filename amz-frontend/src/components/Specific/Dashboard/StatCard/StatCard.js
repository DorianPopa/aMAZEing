import React from "react";
import PropTypes from "prop-types";
import "./StatCard.scss";

const StatCard = ({ children, onClick, title, value }) => {
  return (
    <div className="StatCard" onClick={onClick}>
      <div className="content">
        <p className="title">{title}</p>
        <div className="main">
          <p className="value">{value}</p>
        </div>
        <div className="bottom">{children}</div>
        <div className="edge" />
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

StatCard.defaultProps = {
  children: <></>,
  onClick: () => {},
};

export default StatCard;
