import React from "react";
import PropTypes from "prop-types";

import "./MazeCard.scss";
import Button from "../../Button";
import Edge from "../../Edge/Edge";
import Icon from "../../Icon";

const MazeCard = (props) => {
  const { title, username, index, id } = props;

  return (
    <div className="MazeCard">
      <div className="content">
        <div className="header">
          <div className="index">
            <div className="number">
              <p>#{index}</p>
            </div>
            <Edge type="right" />
          </div>
          <div className="title">
            <p>
              {title} <span>@{username}</span>
            </p>
          </div>
        </div>
        <div className="main">
          <div className="content" />
        </div>
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

MazeCard.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.string,
  username: PropTypes.string,
};

MazeCard.defaultProps = {
  index: "1",
  username: "Tanase",
};

export default MazeCard;
