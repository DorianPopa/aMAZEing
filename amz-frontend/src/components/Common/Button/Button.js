import React from "react";
import PropTypes from "prop-types";
import ButtonEdged from "./ButtonEdged";
import ButtonClassic from "./ButtonClassic";

const Button = (props) => {
  switch (props.type) {
    case "edged":
      return <ButtonEdged {...props} />;
    case "classic":
      return <ButtonClassic {...props} />;
    default:
      return <ButtonClassic {...props} />;
  }
};

Button.propTypes = {
  type: PropTypes.oneOf(["classic", "edged"]),
  theme: PropTypes.oneOf([
    "primary",
    "secondary",
    "outline",
    "outline-primary",
    "outline-secondary",
    "outline-gray",
    "icon-only",
    "light",
    "delete",
  ]),
  ...ButtonEdged.propTypes,
  ...ButtonClassic.propTypes,
};

Button.defaultProps = {
  type: "classic",
  theme: "primary",
  ...ButtonEdged.defaultProps,
  ...ButtonClassic.defaultProps,
};

export default Button;
