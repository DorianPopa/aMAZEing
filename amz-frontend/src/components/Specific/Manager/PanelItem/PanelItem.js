import React from "react";
import PropTypes from "prop-types";
import Piece from "../../../Common/Piece";
import Icon from "../../../Common/Icon";
import "./PanelItem.scss";

const PanelItem = ({ available, isSelected, matrix, name, onClick }) => {
  return (
    <div className="PanelItem" data-selected={isSelected} onClick={onClick}>
      <div className="show">
        <Piece matrix={matrix} />
      </div>
      <div className="content">
        <p className="title">{name} block</p>
        <div className="info">
          <p className="use">{available} available</p>
        </div>
        <div className="bottom">
          <div className="button">
            <Icon icon source="check" family="round" />
            <p className="title">Select</p>
          </div>
        </div>
      </div>
    </div>
  );
};

PanelItem.propTypes = {
  available: PropTypes.number,
  name: PropTypes.string,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  matrix: PropTypes.arrayOf(PropTypes.number).isRequired,
};
PanelItem.defaultProps = {
  available: 0,
  name: "Simple",
};

export default PanelItem;
