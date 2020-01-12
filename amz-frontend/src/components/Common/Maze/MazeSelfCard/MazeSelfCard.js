import React from "react";
import PropTypes from "prop-types";

import "./MazeSelfCard.scss";
import Button from "../../Button";
import Edge from "../../Edge/Edge";
import Icon from "../../Icon";

const MazeSelfCard = (props) => {
  const { title, players, index, id } = props;

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
          <div className="content" />
        </div>
        <div className="footer">
          <div className="content">
            <Button type="classic" theme="outline-dark" title="View solution" mini />
            <Button type="classic" theme="outline-dark" title="Edit" mini />
            <Button type="classic" theme="outline-dark" title="Remove" mini />
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
};

MazeSelfCard.defaultProps = {
  index: 0,
  players: 0,
};

export default MazeSelfCard;
