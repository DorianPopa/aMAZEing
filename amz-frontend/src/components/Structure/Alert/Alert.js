import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Icon from "../../Common/Icon";
import "./Alert.scss";

const Alert = ({ style, options, message, close }) => {
  const { type } = options;
  const icon = type === "error" ? "error" : type === "warn" ? "warning" : type === "success" ? "check" : "public";

  const { isLoading, isClosable } = options;

  return (
    <div className="Alert" data-type={type} style={style}>
      <div className="left">
        <Icon icon family="round" source={icon} />
      </div>
      <div className="content">{message}</div>
      <div className="right" data-closable={isClosable}>
        {isLoading ? (
          <CircularProgress size={20} />
        ) : (
          <div className="button" onClick={close}>
            <Icon icon family="round" source="close" />
          </div>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  options: PropTypes.shape({
    type: PropTypes.string,
    isLoading: PropTypes.bool,
    isClosable: PropTypes.bool,
  }),
  message: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
  close: PropTypes.func,
};

Alert.defaultProps = {
  options: {
    type: "simple",
    isLoading: false,
    isClosable: true,
  },
  style: {},
  close: () => {},
};

export default Alert;
