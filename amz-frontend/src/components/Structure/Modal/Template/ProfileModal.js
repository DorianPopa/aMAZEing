import React from "react";
import PropTypes from "prop-types";
import Button from "../../../Common/Button";
import Modal from "../Modal";
import { Config } from "../../../../base";

const ProfileModal = (props) => {
  const { onClose, isOpen, username, isLogOutFired, onLogOut } = props;
  return (
    <Modal className="ProfileModal" title={`Hello, @${username}!`} isOpen={isOpen} onClose={onClose}>
      <p id="transition-modal-description">Hope you&apos;re enjoying the game!</p>
      <div className="buttons">
        <Button
          type="classic"
          icon={{
            icon: true,
            source: "loupe",
            family: "round",
          }}
          title="Create maze"
          to={Config.ROUTE_PAGE_MAZE_MANAGER_CREATE}
        />
        <Button
          type="classic"
          theme="light"
          icon={{
            icon: true,
            family: "round",
            source: "check",
          }}
          isLoading={isLogOutFired}
          title="Log Out"
          onClick={onLogOut}
        />
      </div>
    </Modal>
  );
};

ProfileModal.propTypes = {
  username: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  isLogOutFired: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool,
};

ProfileModal.defaultProps = {
  isOpen: false,
};

export default ProfileModal;
