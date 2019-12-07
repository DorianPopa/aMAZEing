import React, { Component } from "react";

class CardButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="cardButton">
        <p>{this.props.name}</p>
      </div>
    );
  }
}

export default CardButton;
