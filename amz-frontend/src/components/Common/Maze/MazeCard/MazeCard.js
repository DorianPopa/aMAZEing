import React from "react";
import Trianglify from "trianglify";
import PropTypes from "prop-types";
import "./MazeCard.scss";
import Button from "../../Button";
import Edge from "../../Edge/Edge";
import { Config } from "../../../../base";

const cover = (seed) => {
  const pattern = Trianglify({ width: 400, height: 250, cell_size: 100, seed });
  return pattern.png();
};

const MazeCard = (props) => {
  const { title, username, index, id, solved } = props;

  return (
    <div className="MazeCard" data-id={id}>
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
          <div className="content">
            <img alt="" src={cover(id)} />
          </div>
        </div>
        <div className="footer">
          <div className="content">
            <Button
              type="edged"
              theme={solved ? "light" : "secondary"}
              icon={{
                icon: true,
                source: "play_circle_filled",
                family: "round",
              }}
              title={solved ? "Solved" : "Play this"}
              to={Config.ROUTE_BUILDER_PAGE_MAZE_MANAGER_SOLVE(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

MazeCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number,
  username: PropTypes.string,
};

MazeCard.defaultProps = {
  index: 0,
  username: "Tanase",
};

export default MazeCard;
