import React from "react";
import PropTypes from "prop-types";
import Emoji from "../Emoji/Emoji";
import Image from "../Image";

const Icon = (props) => {
  const { source, alt, label } = props;

  let content = <></>;

  if (props.icon) {
    let { family } = props;
    if (family === "round") family = "material-icons-round";
    if (family === "outlined") family = "material-icons-outlined";
    content = <i className={family}>{source}</i>;
  } else if (props.emoji) {
    content = <Emoji symbol={source} label={label} />;
  } else if (props.image) {
    const { imageHasLoader } = props;
    content = <Image hasLoader={imageHasLoader} source={source} label={label} alt={alt} />;
  }

  return (
    <div className="Icon icon" onClick={props.onClick} style={props.style}>
      {content}
    </div>
  );
};

Icon.propTypes = {
  source: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.shape({})]).isRequired,
  icon: PropTypes.bool,
  image: PropTypes.bool,
  emoji: PropTypes.bool,
  alt: PropTypes.string,
  label: PropTypes.string,
  family: PropTypes.oneOf(["material-icons", "material-icons-round", "material-icons-outlined", "round", "outlined"]),
  imageHasLoader: PropTypes.bool,
  onClick: PropTypes.func,

  style: PropTypes.shape({}),
};

Icon.defaultProps = {
  icon: true,
  image: false,
  emoji: false,
  alt: "",
  label: "",
  family: "material-icons",
  imageHasLoader: true,
  onClick: () => {},

  style: {},
};

export default Icon;
