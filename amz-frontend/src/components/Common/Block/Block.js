import React from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import "./Block.scss";

const Block = (props) => {
  const [{ isOver }, drop] = useDrop({
    accept: "piece",
    drop: () => {
      props.handleIsDroppedOnCanvas(props.line, props.column);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <svg
      className="Block block"
      viewBox="0 0 50 50"
      data-type={props.type}
      ref={props.canvas ? drop : null}
      data-hover={props.canvas && isOver}
    >
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
  canvas: PropTypes.bool,
  type: PropTypes.oneOf(["simple", "forbidden", "empty", "start", "finish", "solution", "air", "map"]),
  column: PropTypes.number,
  line: PropTypes.number,
  handleIsDroppedOnCanvas: PropTypes.func,
};

Block.defaultProps = {
  canvas: false,
  type: "simple",
  column: 0,
  line: 0,
  handleIsDroppedOnCanvas: () => {},
};

export default Block;
