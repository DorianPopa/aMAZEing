import React, { useMemo } from "react";
import PropTypes from "prop-types";
import typy from "typy";
import { connect } from "react-redux";
import NavigatorUser from "./Navigator/NavigatorUser";
import NavigatorVisitor from "./Navigator/NavigatorVisitor";
import "./App.scss";

function App(props) {
  const isAuthenthicated = useMemo(() => {
    return typy(props.store, "user.token").isTruthy && !typy(props.store, "user.token").isEmptyString;
  }, [props.store]);

  return <div className="App">{isAuthenthicated ? <NavigatorUser /> : <NavigatorVisitor />}</div>;
}

App.propTypes = {
  store: PropTypes.shape({
    user: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};

export default connect(
  (store) => {
    return {
      store: {
        user: store.auth.user,
      },
    };
  },
  () => {
    return {
      dispatch: {},
    };
  },
)(App);
