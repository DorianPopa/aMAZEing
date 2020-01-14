import React from "react";
import PropTypes from "prop-types";

const Emoji = (props) => {
  return (
    <span className="Emoji emoji" role="img" aria-label={props.label} aria-hidden={props.label}>
      {props.symbol}
    </span>
  );
};

Emoji.propTypes = {
  label: PropTypes.string,
  symbol: PropTypes.string.isRequired,
};
Emoji.defaultProps = {
  label: null,
};

export default Emoji;
