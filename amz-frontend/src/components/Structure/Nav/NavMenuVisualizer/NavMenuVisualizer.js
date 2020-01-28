import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { withAlert } from "react-alert";
import Button from "../../../Common/Button";
import { ProfileModal } from "../../Modal/Template";
import "./NavMenuVisualizer.scss";

const NavMenuVisualizer = (props) => {
  const [isProfileModalOpen, toggleProfileModal] = useState(false);
  const [isLogOutFired, toggleLogOut] = useState(false);

  return (
    <menu className="NavMenuVisualizer">
      <Button
        type="edged"
        theme="primary"
        icon={{
          icon: true,
          source: "arrow_back",
          family: "round",
        }}
        title="Back to Dashboard"
        onClick={() => {
          props.onGoToDashboard();
        }}
        isEdgeAnimated={false}
      />

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

NavMenuVisualizer.propTypes = {
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
  onGoToDashboard: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
};
NavMenuVisualizer.defaultProps = {
  user: {
    username: "Visitor",
    id: "",
  },
};

export default compose(withRouter, withAlert())(NavMenuVisualizer);
