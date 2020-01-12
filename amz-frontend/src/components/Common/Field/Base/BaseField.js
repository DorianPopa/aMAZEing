import React, { Component } from "react";
import PropTypes from "prop-types";
import Label from "../Label/Label";
import "./BaseField.scss";

class BaseField extends Component {
  componentDidMount() {
    this.props.onInitialized();
  }

  render() {
    const { warn, label, id } = this.props;

    return (
      <div className="Base" data-warn={warn}>
        <div className="container">
          <Label title={label} warn={warn} linkedTo={id} />
          {this.field()}
          <div className="warn">
            <div className="content">
              <div />
            </div>
          </div>
        </div>
      </div>
    );
  }

  field() {
    console.error("Implement Field.field()", this);
    return (
      <div className="Field">
        <p style={{ color: "#aaa" }}>-</p>
      </div>
    );
  }
}

BaseField.propTypes = {
  id: PropTypes.string.isRequired,

  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  onInitialized: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,

  warn: PropTypes.bool,

  type: PropTypes.string,
};

BaseField.defaultProps = {
  label: "Field",
  onInitialized: () => {},
  onBlur: () => {},
  onFocus: () => {},

  warn: false,

  type: "text",
};

export default BaseField;
