import React from "react";
import PropTypes from "prop-types";
import Button from "../../../Common/Button";
import Modal from "../Modal";
import { Config } from "../../../../base";

const RequestSolutionModal = (props) => {
  const { onClose, isOpen, onSubmit, isRequestFired, isSelf } = props;
  return (
    <Modal className="RequestSolutionModal" title="Request Official Solution" isOpen={isOpen} onClose={onClose}>
      <p id="transition-modal-description">
        {isSelf
          ? "Want to see the official solution for your maze? Pick an algorithm from below."
          : "Want see the official solution? If you haven't already submited your own, requesting the solution will automatically set your score to 0 for this maze. If you wish to continue, pick an algorithm from below."}
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
          theme="primary"
          icon={{
            icon: true,
            family: "round",
            source: "directions",
          }}
          isLoading={isRequestFired}
          title="BFS"
          onClick={() => {
            onSubmit(Config.SOLUTION_ALGORIGHM.BFS);
          }}
        />
        <Button
          type="classic"
          theme="primary"
          icon={{
            icon: true,
            family: "round",
            source: "directions",
          }}
          isLoading={isRequestFired}
          title="Bidirectional BFS"
          onClick={() => {
            onSubmit(Config.SOLUTION_ALGORIGHM.BIDIRECTIONAL_BFS);
          }}
        />
        <Button
          type="classic"
          theme="primary"
          icon={{
            icon: true,
            family: "round",
            source: "directions",
          }}
          isLoading={isRequestFired}
          title="A* algorithm"
          onClick={() => {
            onSubmit(Config.SOLUTION_ALGORIGHM.ASTAR);
          }}
        />
      </div>
    </Modal>
  );
};

RequestSolutionModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  isSelf: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  isRequestFired: PropTypes.string,
};

RequestSolutionModal.defaultProps = {
  isOpen: false,
  isSelf: false,
  isRequestFired: null,
};

export default RequestSolutionModal;
