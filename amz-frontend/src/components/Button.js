import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Button.scss";
import { ReactComponent as Edge } from "../assets/edge.svg";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getContent = () => {
    return (
      <div className={`inner ${this.props.color}`}>
        {this.props.shape !== "shapeless" ? (
          <div className="edge left">
            <Edge />
          </div>
        ) : null}
        <div className={`center ${this.props.color}`}>
          {this.props.text !== "null" ? <p>{this.props.text}</p> : null}
          {this.props.icon !== "null" ? <i className="material-icons">{this.props.icon}</i> : null}
        </div>
        {this.props.shape !== "shapeless" ? (
          <div className="edge right">
            <Edge />
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    return <div className={`${this.props.shape} myButton`}>{this.getContent()}</div>;
  }
}

export default Button;

Button.propTypes = {
  color: PropTypes.string.isRequired,
  shape: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
};
Button.defaultProps = {
  icon: "null",
  text: "null",
  shape: "shapeless",
};
