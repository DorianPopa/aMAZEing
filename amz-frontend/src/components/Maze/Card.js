import React, { Component } from "react";
import "./Card.scss";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="card">
        <div className="header">
          <div className="number">
            <p>#{this.props.number}</p>
          </div>
          <div className="title">
            <p>{this.props.title}</p>
          </div>
          <div className="playerCount">
            <p>{this.props.playerCount} players</p>
          </div>
        </div>
        <div className="main">
          <p>This is a picture of a maze.</p>
        </div>
        <div className="footer">
          {/* <Button text="View solution" color="white" />
          <Button text="Edit" color="white" />
          <Button text="Remove" color="white" /> */}
        </div>
      </div>
    );
  }
}

export default Card;
