import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { withAlert } from "react-alert";
import Button from "../../../Common/Button";
import { Config } from "../../../../base";
import "./NavMenuManager.scss";
import { CancelMazeCreateModal, RemoveMazeModal, ProfileModal } from "../../Modal/Template";

const NavMenuManager = (props) => {
  const [isProfileModalOpen, toggleProfileModal] = useState(false);
  const [isLogOutFired, toggleLogOut] = useState(false);
  const [isCancelModalOpen, toggleCancelModal] = useState(false);
  const [isRemoveModalOpen, toggleRemoveModal] = useState(false);

  const { isSelf } = props;

  return (
    <menu className="NavMenuManager">
      {isSelf && (
        <Button
          type="edged"
          theme="delete"
          icon={{
            icon: true,
            source: "delete_sweep",
            family: "outlined",
          }}
          isEdgeAnimated={false}
          onClick={() => {
            toggleRemoveModal(true);
          }}
        />
      )}

      {!isSelf && (
        <Button
          type="edged"
          theme="light"
          icon={{
            icon: true,
            source: "close",
            family: "round",
          }}
          title="Cancel progress"
          onClick={() => {
            toggleCancelModal(true);
          }}
          isEdgeAnimated={false}
        />
      )}

      <Button
        type="edged"
        theme="dark"
        icon={{
          icon: true,
          source: "account_circle",
          family: "round",
        }}
        title={`@${props.user.username}`}
        isEdgeAnimated={false}
        onClick={() => {
          toggleProfileModal(true);
        }}
      />

      <CancelMazeCreateModal
        isOpen={isCancelModalOpen}
        onClose={toggleCancelModal}
        onCancel={() => {
          props.history.replace(Config.ROUTE_PAGE_DASHBOARD);
        }}
      />
      <RemoveMazeModal
        isOpen={isRemoveModalOpen}
        onClose={toggleRemoveModal}
        onRemove={() => {
          props.history.replace(Config.ROUTE_PAGE_DASHBOARD);
          // TODO implementRemove
        }}
      />
      <ProfileModal
        username={props.user.username}
        isOpen={isProfileModalOpen}
        isLogOutFired={isLogOutFired}
        onLogOut={() => {
          if (isLogOutFired) return;
          toggleLogOut(true);
          props.alert.show("Sorry to see you go :(.", { type: "warn", timeout: 5000, isClosable: false });
          setTimeout(() => {
            props.alert.removeAll();
            props.onLogOut();
          }, 3000);
        }}
        onClose={toggleProfileModal}
      />
    </menu>
  );
};

NavMenuManager.propTypes = {
  isSelf: PropTypes.bool,
  user: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.string,
  }),
  alert: PropTypes.shape({
    show: PropTypes.func,
    removeAll: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  onLogOut: PropTypes.func.isRequired,
};
NavMenuManager.defaultProps = {
  isSelf: false,
  user: {
    username: "Visitor",
    id: "",
  },
};

export default compose(withRouter, withAlert())(NavMenuManager);
