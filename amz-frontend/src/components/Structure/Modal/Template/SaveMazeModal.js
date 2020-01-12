import React from "react";
import PropTypes from "prop-types";
import Button from "../../../Common/Button";
import Modal from "../Modal";
import TextField from "../../../Common/Field/Text/TextField";

const SaveMazeModal = (props) => {
  const { onClose, isOpen, onSave, mazeName, toggleMazeName, mazeNameWarn, isSavingFired } = props;
  return (
    <Modal className="SaveMazeModal" title="Save Maze" isOpen={isOpen} onClose={onClose}>
      <p id="transition-modal-description">
        If you&apos;re sure this maze will be the best ever created, give it a name and <br />
        send it out into the world!
      </p>
      <div className="fields">
        <TextField
          id="mazename"
          type="text"
          label="Give it a name"
          value={mazeName}
          warn={mazeNameWarn}
          onChange={(e) => toggleMazeName(e.target.value)}
        />
      </div>
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
          theme="secondary"
          icon={{
            icon: true,
            family: "round",
            source: "check",
          }}
          isLoading={isSavingFired}
          title="Save"
          onClick={onSave}
        />
      </div>
    </Modal>
  );
};

SaveMazeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  mazeName: PropTypes.string.isRequired,
  toggleMazeName: PropTypes.string.isRequired,
  mazeNameWarn: PropTypes.bool,
  isSavingFired: PropTypes.bool,
};

SaveMazeModal.defaultProps = {
  isOpen: false,
  mazeNameWarn: false,
  isSavingFired: false,
};

export default SaveMazeModal;
