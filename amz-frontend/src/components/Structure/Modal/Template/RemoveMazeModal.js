import React from "react";
import PropTypes from "prop-types";
import Button from "../../../Common/Button";
import Modal from "../Modal";

const RemoveMazeModal = (props) => {
  const { onRemove, onClose, isOpen } = props;
  return (
    <Modal className="RemoveModal" title="Remove Maze?" isOpen={isOpen} onClose={onClose}>
      <p id="transition-modal-description">
        If you choose to continue with this, players will not be able to submit their solutions for this maze anymore.
        The map will be deleted from the platform forever. Are you sure?
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
          theme="secondary"
          icon={{
            icon: true,
            family: "round",
            source: "delete_forever",
          }}
          title="Remove"
          onClick={onRemove}
        />
      </div>
    </Modal>
  );
};

RemoveMazeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

RemoveMazeModal.defaultProps = {
  isOpen: false,
};

export default RemoveMazeModal;
