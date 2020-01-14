import React from "react";
import PropTypes from "prop-types";
import "./Block.scss";
import { Config } from "../../../base";

const Block = ({ type, isHoverEnabled, onClick, rank }) => {
  return (
    <svg
      className="Block block"
      viewBox="0 0 50 50"
      data-rank-line={rank.line}
      data-rank-column={rank.column}
      data-type={type}
      data-hover={isHoverEnabled}
      onClick={onClick}
    >
      <g>
        <path className="main" d="M 0 0 50 0 50 50 0 50" />
        <path className="triangle-left" d="M 0 0 25 25 0 50" />
        <path className="triangle-top" d="M 0 0 25 25 50 0" />
        <path className="triangle-right" d="M 50 0 25 25 50 50" />
        <path className="triangle-bottom" d="M 50 50 25 25 0 50" />
        <path className="overlay" d="M 0 0 50 0 50 50 0 50" />
        {type === Config.BLOCK_TYPE.SELF ? (
          <text x="2" y="2" fill="white" fontSize={30}>
            ✪
          </text>
        ) : null}
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
    Config.BLOCK_TYPE.SELF,
  ]),
  isHoverEnabled: PropTypes.bool,
  onClick: PropTypes.func,
  rank: PropTypes.shape({
    line: PropTypes.number,
    column: PropTypes.number,
  }),
};

Block.defaultProps = {
  type: "simple",
  isHoverEnabled: true,
  onClick: () => {},
  rank: {
    line: 0,
    column: 0,
  },
};

export default Block;
