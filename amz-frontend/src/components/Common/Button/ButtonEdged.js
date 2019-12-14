import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Button.scss";
import Icon from "../Icon";
import { EdgeLeft, EdgeRight } from "../Edge/Edge";

const ButtonEdged = (props) => {
  const E_W = 20;
  const E_H = 40;

  const content = (
    <>
      <EdgeLeft width={E_W} height={E_H} />
      <div className="content">
        {props.icon ? <Icon style={props.title ? {} : { margin: 0 }} {...props.icon} /> : null}
        <div className="title">
          <p>{props.title}</p>
        </div>
      </div>
      <EdgeRight width={E_W} height={E_H} />
    </>
  );

  return props.to ? (
    <Link
      to={props.to}
      className="Button Edged"
      data-theme={props.theme}
      data-animate-edge={props.isEdgeAnimated}
      onClick={props.onClick}
    >
      {content}
    </Link>
  ) : (
    <div
      className="Button Edged"
      data-theme={props.theme}
      data-animate-edge={props.isEdgeAnimated}
      onClick={props.onClick}
    >
      {content}
    </div>
  );
};

ButtonEdged.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.shape(Icon.propTypes),
  theme: PropTypes.string.isRequired,

  onClick: PropTypes.func,

  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isSuccessful: PropTypes.bool,

  isEdgeAnimated: PropTypes.bool,

  to: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
};

ButtonEdged.defaultProps = {
  title: "",
  icon: Icon.defaultProps,

  onClick: () => {},

  isDisabled: false,
  isLoading: false,
  isSuccessful: false,

  isEdgeAnimated: true,

  to: null,
};

export default ButtonEdged;
