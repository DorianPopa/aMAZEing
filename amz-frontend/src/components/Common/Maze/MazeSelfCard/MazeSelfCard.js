import React from "react";
import Trianglify from "trianglify";
import PropTypes from "prop-types";

import "./MazeSelfCard.scss";
import Button from "../../Button";
import Edge from "../../Edge/Edge";
import Icon from "../../Icon";

const cover = (seed) => {
  const pattern = Trianglify({
    width: 400,
    height: 250,
    cell_size: 150,
    variance: 1,
    seed,
    x_colors: ["1a1b2b", "292b45", "7f00ff", "292b45"],
  });
  return pattern.png();
};

const MazeSelfCard = (props) => {
  const { title, players, index, id, onView, onRemove } = props;

  return (
    <div className="MazeSelfCard" data-id={id}>
      <div className="content">
        <div className="header">
          <div className="index">
            <div className="number">
              <p>#{index}</p>
            </div>
            <Edge type="right" />
          </div>
          <div className="title">
            <p>{title}</p>
          </div>
          <div className="info">
            <p>{players}</p>
            <Icon icon source="supervisor_account" family="round" />
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
              type="classic"
              theme="outline-dark"
              icon={{ icon: true, family: "round", source: "view_module" }}
              title="View"
              mini
              onClick={() => onView(id)}
            />
            <Button type="classic" theme="outline-dark" title="Remove" mini onClick={() => onRemove(id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

MazeSelfCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number,
  players: PropTypes.number,

  onView: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

MazeSelfCard.defaultProps = {
  index: 0,
  players: 0,
};

export default MazeSelfCard;
