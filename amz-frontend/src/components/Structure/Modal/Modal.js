import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MUIModal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import Icon from "../../Common/Icon";
import "./Modal.scss";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    boxShadow: theme.shadows[5],
  },
}));

const Modal = (props) => {
  const { isOpen, onClose, children, title, className } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <MUIModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        disableBackdropClick
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={`${classes.paper} Modal ${className}`}>
            <div className="top">
              <h2 id="transition-modal-title">{title}</h2>
              <div className="button" onClick={handleClose}>
                <Icon icon family="round" source="close" />
              </div>
            </div>
            <div className="ModalContent">{children}</div>
          </div>
        </Fade>
      </MUIModal>
    </div>
  );
};

Modal.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.shape({})]),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  className: "",
  title: "aMAZEing",
  children: <></>,
  isOpen: false,
  onClose: () => {},
};

export default Modal;
