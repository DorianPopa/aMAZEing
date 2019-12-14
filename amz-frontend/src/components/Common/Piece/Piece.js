import React from "react";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import "./Piece.scss";
import Block from "../Block/Block";
import Icon from "../Icon";

const Piece = (props) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: "piece" },
    begin: () => {
      props.setDragged({ size: props.size, matrix: props.matrix });
    },
    end: () => {
      props.setDragged(null);
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <>
      <div className="Piece" data-dragging={isDragging} ref={preview}>
        <div
          className="box"
          style={{
            gridTemplateColumns: `repeat(${props.size},1fr)`,
            gridTemplateRows: `repeat(${props.size},1fr)`,
          }}
        >
          <div className="handle" ref={drag}>
            <Icon icon source="open_with" family="round" />
          </div>
          {props.matrix.map((e, index) => {
            const type = (() => {
              switch (e) {
                case 0:
                  return "empty";
                case 1:
                  return "simple";
                case 2:
                  return "start";
                case 3:
                  return "finish";
                case -1:
                  return "forbidden";
                default:
                  return "empty";
              }
            })();

            const key = index + 1;

            return <Block key={key} type={type} />;
          })}
        </div>
      </div>
    </>
  );
};

Piece.propTypes = {
  size: PropTypes.number,
  matrix: PropTypes.arrayOf(PropTypes.number),
  setDragged: PropTypes.func,
};

Piece.defaultProps = {
  setDragged: () => {},
  size: 3,
  matrix: [1, 1, 1, 1, 0, 0, 1, 0, 0],
};

export default Piece;
