import React from "react";
import PropTypes from "prop-types";
import "./MazeCard.scss";

const MazeCard = (props) => {
  return (
    <div className="MazeCard">
      <div className="content">
        <div className="header">
          <div className="index">
            <p>#1</p>
          </div>
          <div className="title">
            <p>Maze_Name 39</p>
          </div>
          <div className="info">
            <p>4 players</p>
          </div>
        </div>
        <div className="main"></div>
        <div className="footer"></div>
      </div>
    </div>
  );
};

export default MazeCard;
