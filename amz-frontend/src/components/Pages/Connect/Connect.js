import React, { Component } from "react";
import PropTypes from "prop-types";
import typy from "typy";
import { withAlert } from "react-alert";
import { compose } from "redux";
import { connect } from "react-redux";

import Button from "../../Common/Button";
import { Config, Network } from "../../../base";
import Block from "../../Common/Block/Block";

import TextField from "../../Common/Field/Text/TextField";

import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import "./Connect.scss";

const PIECE = 90;
const WIDTH = parseInt(window.innerWidth / PIECE, 10) + 1;
const HEIGHT = parseInt(window.innerHeight / PIECE, 10) + 1;

class Connect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: {
        warn: false,
        value: "",
      },
      password: {
        warn: false,
        value: "",
      },
      warnText: null,

      isRegistering: false,
      isLoggingIn: false,

      restrict: false,
    };
  }

  componentDidMount() {
    document.title = this.props.title;
  }

  renderRegister = () => {
    return (
      <form>
        <TextField
          id="username"
          type="text"
          label={
            <>
              Username <span>| Some awesome unique identifier</span>
            </>
          }
          value={this.state.username.value}
          warn={this.state.username.warn}
          onChange={(e) => {
            this.setState({ username: { value: e.target.value, warn: false } });
          }}
        />
        <TextField
          id="password"
          type="password"
          label={
            <>
              Password <span>| Pick one strong and mighty</span>
            </>
          }
          value={this.state.password.value}
          warn={this.state.password.warn}
          onChange={(e) => {
            this.setState({ password: { value: e.target.value, warn: false } });
          }}
        />
        <div className="divider" />
        {this.state.warnText ? <p className="warn">{typy(this.state.warnText).safeString}</p> : null}
        <Button
          theme="cherry"
          type="classic"
          title="Create your account"
          onClick={this.doRegister}
          isLoading={this.state.isRegistering}
        />
        <Button to={Config.ROUTE_PAGE_CONNECT} theme="secondary" type="classic" title="Already registered? Log In" />
      </form>
    );
  };

  renderLogin = () => {
    return (
      <form>
        <TextField
          id="username"
          type="text"
          label={
            <>
              Username <span>| Your awesome unique identifier</span>
            </>
          }
          value={this.state.username.value}
          warn={this.state.username.warn}
          onChange={(e) => {
            this.setState({ username: { value: e.target.value, warn: false } });
          }}
        />
        <TextField
          id="password"
          type="password"
          label={
            <>
              Password <span>| The strongest there is</span>
            </>
          }
          value={this.state.password.value}
          warn={this.state.password.warn}
          onChange={(e) => {
            this.setState({ password: { value: e.target.value, warn: false } });
          }}
        />
        <div className="divider" />
        {this.state.warnText ? <p className="warn">{typy(this.state.warnText).safeString}</p> : null}
        <Button type="classic" title="Log In" onClick={this.doLogin} isLoading={this.state.isLoggingIn} />
        <Button to={Config.ROUTE_PAGE_CONNECT_REGISTER} theme="secondary" type="classic" title="Sign up" />
      </form>
    );
  };

  doCheckFields = () => {
    let areFieldReady = true;

    if (typy(this.state, "username.value").isEmptyString) {
      this.setState((prev) => ({ username: { ...prev.username, warn: true } }));
      areFieldReady = false;
    }

    if (typy(this.state, "password.value").isEmptyString) {
      this.setState((prev) => ({ password: { ...prev.password, warn: true } }));
      areFieldReady = false;
    }

    this.setState({ warnText: !areFieldReady ? "Empty username or password. Check again." : null });

    return areFieldReady;
  };

  doLogin = async ({ isOnboarding = false, payload }) => {
    if (this.state.isLoggingIn) return;
    if (!isOnboarding) {
      const areFieldReady = this.doCheckFields();
      if (!areFieldReady) return;
    }

    this.setState({ isLoggingIn: true });

    const response = await Network.doUserLogin(
      isOnboarding
        ? payload
        : {
            username: this.state.username.value,
            password: this.state.password.value,
          },
    );
    const { status } = response;
    const result = await response.json();

    console.log(status, result);

    this.setState({ isLoggingIn: false });
    this.props.alert.removeAll();

    switch (status) {
      case Config.HTTP_STATUS.OK: {
        this.props.alert.show("Connected to aMAZEing. Have fun!", {
          type: "success",
          timeout: 1000,
        });
        this.setState({ restrict: true });

        setTimeout(() => {
          this.props.dispatch.doUserSetId(result.id);
          this.props.dispatch.doUserSetToken(result.token);
          this.props.dispatch.doUserSetUsername(result.username);
          this.props.history.replace(Config.ROUTE_PAGE_DASHBOARD);
        }, 1000);

        break;
      }
      case Config.HTTP_STATUS.BAD_REQUEST:
        this.props.alert.show(typy(result.message).safeString, { type: "error", timeout: 5000 });
        break;
      default:
        break;
    }
  };

  doRegister = async () => {
    if (this.state.isRegistering) return;
    const areFieldReady = this.doCheckFields();

    if (!areFieldReady) return;

    this.setState({ isRegistering: true });

    const payload = {
      username: this.state.username.value,
      password: this.state.password.value,
    };

    const response = await Network.doUserRegister(payload);

    const { status } = response;
    const result = await response.json();

    console.log(status, result);

    this.setState({ isLoggingIn: false });

    switch (status) {
      case Config.HTTP_STATUS.CREATED:
        this.props.alert.show("Welcome to aMAZEing! Connecting you...", {
          type: "simple",
          isLoading: true,
          timeout: 20000,
        });
        this.doLogin({ isOnboarding: true, payload });
        break;
      case Config.HTTP_STATUS.BAD_REQUEST:
        this.props.alert.show(typy(result.message).safeString, { type: "error", timeout: 5000 });
        break;
      default:
        break;
    }
  };

  render() {
    const { type } = this.props;

    return (
      <div className="Connect" data-type={type} data-restrict={this.state.restrict}>
        <section className="content">
          <div className="card">
            <div className="main">
              <div className="top">
                <Logo />
              </div>
              {type === Config.CONNECT_TYPE.REGISTER ? this.renderRegister() : this.renderLogin()}
            </div>
          </div>
        </section>
        <div className="underlay">
          <div
            className="background"
            style={{
              width: PIECE * WIDTH,
              height: PIECE * HEIGHT,
              gridTemplateColumns: `repeat(${WIDTH},1fr)`,
              gridTemplateRows: `repeat(${HEIGHT},1fr)`,
            }}
          >
            {[...Array(HEIGHT).keys()].map((line) =>
              [...Array(WIDTH).keys()].map((column) => (
                <Block
                  rank={{ line: (line % 7) + 1, column: (column % 7) + 1 }}
                  key={`l${line}c${column}`}
                  type={type === Config.CONNECT_TYPE.REGISTER ? Config.BLOCK_TYPE.FINISH : Config.BLOCK_TYPE.SIMPLE}
                />
              )),
            )}
          </div>
        </div>
      </div>
    );
  }
}

Connect.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf([Config.CONNECT_TYPE.LOGIN, Config.CONNECT_TYPE.REGISTER]),
  alert: PropTypes.shape({
    show: PropTypes.func,
    removeAll: PropTypes.func,
  }).isRequired,
  store: PropTypes.shape({
    user: PropTypes.shape({}),
  }).isRequired,
  dispatch: PropTypes.shape({
    doUserSetToken: PropTypes.func,
    doUserSetId: PropTypes.func,
    doUserSetUsername: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
};

Connect.defaultProps = {
  type: Config.CONNECT_TYPE.LOGIN,
};

export default compose(
  withAlert(),
  connect(
    (store) => {
      return {
        store: {
          user: store.auth.user,
        },
      };
    },
    (dispatch) => {
      return {
        dispatch: {
          doUserSetUsername: (username) => {
            return dispatch({ type: Config.REDUX_ACTION.USER_SET_USERNAME, payload: { username } });
          },
          doUserSetToken: (token) => {
            return dispatch({ type: Config.REDUX_ACTION.USER_SET_TOKEN, payload: { token } });
          },
          doUserSetId: (id) => {
            return dispatch({ type: Config.REDUX_ACTION.USER_SET_ID, payload: { id } });
          },
        },
      };
    },
  ),
)(Connect);
