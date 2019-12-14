import React from "react";
import PropTypes from "prop-types";

const Image = (props) => {
  const { source, alt, label } = props;

  return (
    <div className="Image image" title={label}>
      <img nopin="nopin" alt={alt} src={source} />
    </div>
  );
};

Image.propTypes = {
  source: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.shape({})]),
  alt: PropTypes.string,
  label: PropTypes.string,
};

Image.defaultProps = {
  source: "",
  alt: "",
  label: "",
};

export default Image;
