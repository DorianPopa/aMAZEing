import React from "react";
import PropTypes from "prop-types";
import "./Block.scss";
import { Config } from "../../../base";

const Block = ({ isAnimated, delay, type, isHoverEnabled, onClick, rank }) => {
  return (
    <svg
      className="Block block"
      viewBox="0 0 50 50"
      data-rank-line={rank.line}
      data-rank-column={rank.column}
      data-type={type}
      data-hover={isHoverEnabled}
      onClick={onClick}
      data-animated={isAnimated}
      style={{ animationDelay: delay }}
    >
      <g>
        <path className="main" d="M 0 0 50 0 50 50 0 50" />
        <path className="triangle-left" d="M 0 0 25 25 0 50" />
        <path className="triangle-top" d="M 0 0 25 25 50 0" />
        <path className="triangle-right" d="M 50 0 25 25 50 50" />
        <path className="triangle-bottom" d="M 50 50 25 25 0 50" />
        <path className="overlay" d="M 0 0 50 0 50 50 0 50" style={{ animationDelay: delay }} />
        {type === Config.BLOCK_TYPE.SELF ? (
          <text x="15" y="25" fill="white" fontSize={25}>
            ✪
          </text>
        ) : null}
      </g>
    </svg>
  );
};

Block.propTypes = {
  isAnimated: PropTypes.bool,
  delay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf([
    Config.BLOCK_TYPE.FORBIDDEN,
    Config.BLOCK_TYPE.EMPTY,
    Config.BLOCK_TYPE.SIMPLE,
    Config.BLOCK_TYPE.START,
    Config.BLOCK_TYPE.FINISH,
    Config.BLOCK_TYPE.SOLUTION,
    Config.BLOCK_TYPE.SELF,
    Config.BLOCK_TYPE.VISITED,
  ]),
  isHoverEnabled: PropTypes.bool,
  onClick: PropTypes.func,
  rank: PropTypes.shape({
    line: PropTypes.number,
    column: PropTypes.number,
  }),
};

Block.defaultProps = {
  isAnimated: false,
  delay: "0ms",
  type: "simple",
  isHoverEnabled: true,
  onClick: () => {},
  rank: {
    line: 0,
    column: 0,
  },
};

export default Block;
