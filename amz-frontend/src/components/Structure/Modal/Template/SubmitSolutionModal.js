import React from "react";
import PropTypes from "prop-types";
import Button from "../../../Common/Button";
import Modal from "../Modal";

const SubmitSolutionModal = (props) => {
  const { onClose, isOpen, onSubmit, isSubmitFired } = props;
  return (
    <Modal className="SubmitSolutionModal" title="Submit Solution" isOpen={isOpen} onClose={onClose}>
      <p id="transition-modal-description">
        You&apos;re about to submit your solution for review. Based on how close it is to the official solution, you
        will get an accuracy score. <b>You can only do this once!</b> Ready to send us your solution?
      </p>
      <div className="buttons">
        <Button
          type="classic"
          theme="outline"
          icon={{
            icon: true,
            source: "close",
            family: "round",
          }}
          title="Cancel"
          onClick={onClose}
        />
        <Button
          type="classic"
          theme="solution"
          icon={{
            icon: true,
            family: "round",
            source: "flash_on",
          }}
          isLoading={isSubmitFired}
          title="Submit"
          onClick={onSubmit}
        />
      </div>
    </Modal>
  );
};

SubmitSolutionModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  isSubmitFired: PropTypes.bool,
};

SubmitSolutionModal.defaultProps = {
  isOpen: false,
  isSubmitFired: false,
};

export default SubmitSolutionModal;
