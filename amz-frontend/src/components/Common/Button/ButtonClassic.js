import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./Button.scss";
import Icon from "../Icon";

const ButtonClassic = (props) => {
  const content = (
    <div className="content">
      {props.icon ? <Icon {...props.icon} /> : null}
      <div className="title">
        <p>{props.title}</p>
      </div>
    </div>
  );

  return props.to ? (
    <Link to={props.to} className="Button Classic" data-theme={props.theme} onClick={props.onClick}>
      {content}
    </Link>
  ) : (
    <div className="Button Classic" data-theme={props.theme} onClick={props.onClick}>
      {content}
    </div>
  );
};

ButtonClassic.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.shape(Icon.propTypes),
  theme: PropTypes.string.isRequired,
  onClick: PropTypes.func,

  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isSuccessful: PropTypes.bool,

  to: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
};

ButtonClassic.defaultProps = {
  title: "",
  icon: Icon.defaultProps,

  onClick: () => {},

  isDisabled: false,
  isLoading: false,
  isSuccessful: false,

  to: null,
};

export default ButtonClassic;
