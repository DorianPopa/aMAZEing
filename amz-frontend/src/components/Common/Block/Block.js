import React from "react";
import PropTypes from "prop-types";
import "./Block.scss";
import Config from "../../../config";

const Block = ({ type, isHoverEnabled, onClick }) => {
  return (
    <svg className="Block block" viewBox="0 0 50 50" data-type={type} data-hover={isHoverEnabled} onClick={onClick}>
      <g>
        <path className="main" d="M 0 0 50 0 50 50 0 50" />
        <path className="triangle-left" d="M 0 0 25 25 0 50" />
        <path className="triangle-top" d="M 0 0 25 25 50 0" />
        <path className="triangle-right" d="M 50 0 25 25 50 50" />
        <path className="triangle-bottom" d="M 50 50 25 25 0 50" />
        <path className="overlay" d="M 0 0 50 0 50 50 0 50" />
      </g>
    </svg>
  );
};

Block.propTypes = {
  type: PropTypes.oneOf([
    Config.BLOCK_TYPE.FORBIDDEN,
    Config.BLOCK_TYPE.EMPTY,
    Config.BLOCK_TYPE.SIMPLE,
    Config.BLOCK_TYPE.START,
    Config.BLOCK_TYPE.FINISH,
    Config.BLOCK_TYPE.SOLUTION,
  ]),
  isHoverEnabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Block.defaultProps = {
  type: "simple",
  isHoverEnabled: true,
  onClick: () => {},
};

export default Block;
