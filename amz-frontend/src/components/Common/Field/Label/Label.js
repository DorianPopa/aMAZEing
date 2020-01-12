import PropTypes from "prop-types";
import React, { Component } from "react";
import "./Label.scss";

class Label extends Component {
  render() {
    const { linkedTo, title, warn } = this.props;

    return (
      <div className="Label" data-warn={warn}>
        <div className="label">
          <label htmlFor={linkedTo}>{title}</label>
        </div>
      </div>
    );
  }
}

Label.propTypes = {
  linkedTo: PropTypes.oneOfType([PropTypes.func, PropTypes.shape, PropTypes.string]),
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  warn: PropTypes.bool,
};
Label.defaultProps = {
  warn: false,
  linkedTo: null,
};

export default Label;
