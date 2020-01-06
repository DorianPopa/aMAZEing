import React from "react";
import PropTypes from "prop-types";

import "./MazeSelfCard.scss";
import Button from "../../Button";

const MazeSelfCard = (props) => {
  return (
    <div className="MazeSelfCard">
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
        <div className="footer">
          <div className="content">
            <Button
              type="edged"
              theme="secondary"
              icon={{
                icon: true,
                source: "play_circle_filled",
                family: "round",
              }}
              title="Play this"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MazeSelfCard;
