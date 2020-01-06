import React from "react";
import PropTypes from "prop-types";
import "./Piece.scss";
import Block from "../Block/Block";
import Icon from "../Icon";

const Piece = (props) => {
  return (
    <>
      <div className="Piece">
        <div
          className="box"
          style={{
            gridTemplateColumns: `repeat(${props.size},1fr)`,
            gridTemplateRows: `repeat(${props.size},1fr)`,
          }}
        >
          <div className="handle">
            <Icon icon source="open_with" family="round" />
          </div>
          {props.matrix.map((e, index) => {
            const key = index + 1;
            return <Block isHoverEnabled={false} key={key} type={e} />;
          })}
        </div>
      </div>
    </>
  );
};

Piece.propTypes = {
  size: PropTypes.number,
  matrix: PropTypes.arrayOf(PropTypes.number),
};

Piece.defaultProps = {
  size: 3,
  matrix: [1, 1, 1, 1, 0, 0, 1, 0, 0],
};

export default Piece;
