import React from "react";
import PropTypes from "prop-types";
import Button from "../../../Common/Button";
import Modal from "../Modal";

const CancelMazeCreateModal = (props) => {
  const { onCancel, onClose, isOpen } = props;
  return (
    <Modal className="CancelModal" title="Cancel progress?" isOpen={isOpen} onClose={onClose}>
      <p id="transition-modal-description">
        If you do this, the work on this maze will be removed. <br />
        Are you sure you want to cancel the progress and return to the Dahsboard?
      </p>
      <div className="buttons">
        <Button
          type="classic"
          theme="outline"
          title="Close"
          onClick={() => {
            onClose(false);
          }}
        />
        <Button
          type="classic"
          theme="light"
          icon={{
            icon: true,
            family: "round",
            source: "check",
          }}
          title="Cancel changes"
          onClick={onCancel}
        />
      </div>
    </Modal>
  );
};

CancelMazeCreateModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

CancelMazeCreateModal.defaultProps = {
  isOpen: false,
};

export default CancelMazeCreateModal;
