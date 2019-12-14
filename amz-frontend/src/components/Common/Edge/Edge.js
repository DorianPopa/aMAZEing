import React from "react";
import PropTypes from "prop-types";
import "./Edge.scss";

const Edge = (props) => {
  switch (props.type) {
    case "left":
      return <EdgeLeft {...props} />;

    case "right":
    default:
      return <EdgeRight {...props} />;
  }
};

const EdgeLeft = (props) => {
  const { width, height } = props;

  return (
    <div className="Edge edge left">
      <svg viewBox={`0 0 ${width} ${height}`}>
        <path d={`M 0 ${height} L ${width - 2} 0 L ${width} 0 L ${width} ${height}`} />
      </svg>
    </div>
  );
};

const EdgeRight = (props) => {
  const { width, height } = props;

  return (
    <div className="Edge edge right">
      <svg viewBox={`0 0 ${width} ${height}`}>
        <path d={`M 0 ${height} L 0 0 L ${width} 0 L 2 ${height}`} />
      </svg>
    </div>
  );
};

Edge.propTypes = {
  type: PropTypes.oneOf(["left", "right"]).isRequired,
};

EdgeLeft.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
EdgeLeft.defaultProps = {
  width: 20,
  height: 40,
};

EdgeRight.propTypes = EdgeLeft.propTypes;
EdgeRight.defaultProps = EdgeLeft.defaultProps;

export default Edge;
export { EdgeLeft, EdgeRight };
