/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withAlert } from "react-alert";
import { compose } from "redux";
import { connect } from "react-redux";

import "./ScoreDisplay.scss";
import Emoji from "../../../Common/Emoji/Emoji";
import Button from "../../../Common/Button";
import { RequestSolutionModal } from "../../../Structure/Modal/Template";
import { Config } from "../../../../base";

class ScoreDisplay extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isRequestSolutionModalOpen: false,
    };
  }

  get isMounted() {
    return this._isMounted;
  }

  set isMounted(value) {
    this._isMounted = value;
  }

  componentDidMount() {
    this.isMounted = true;
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    const { id, isOpen, score, onDismiss } = this.props;

    return (
      <div className="ScoreDisplay" data-visible={isOpen}>
        <div className="content">
          <div className="score">
            <div className="label">
              <p>
                Your solution has been vetted. The score is <Emoji symbol="🥁🥁🥁" />
              </p>
            </div>
            <div className="value">
              <p>{score}</p>
            </div>
          </div>
          <p className="info">
            Go back and try some more mazes or view how we found the correct solution to this maze. We&apos;re using
            algorithms such as <b>BFS</b>, <b>Bidirectional BFS</b> and <b>A*</b>.
          </p>
          <div className="buttons">
            <Button
              type="classic"
              theme="gray"
              icon={{
                icon: true,
                family: "round",
                source: "arrow_back",
              }}
              title="Back to Dashboard"
              onClick={onDismiss}
            />
            <Button
              type="classic"
              theme="solution"
              icon={{
                icon: true,
                family: "round",
                source: "flash_on",
              }}
              title="View algorithmic solution"
              onClick={() => {
                this.setState({ isRequestSolutionModalOpen: true });
              }}
            />
          </div>
        </div>

        <RequestSolutionModal
          isSelf
          isOpen={this.state.isRequestSolutionModalOpen}
          onClose={() => {
            this.setState({ isRequestSolutionModalOpen: false });
          }}
          onSubmit={(type) => {
            this.props.history.push(Config.ROUTE_BUILDER_PAGE_MAZE_VISUALIZER(id, type));
          }}
        />
      </div>
    );
  }
}

ScoreDisplay.propTypes = {
  isOpen: PropTypes.bool,
  score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onDismiss: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  alert: PropTypes.shape({
    show: PropTypes.func,
    removeAll: PropTypes.func,
  }).isRequired,
  store: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  dispatch: PropTypes.shape({}).isRequired,
};

ScoreDisplay.defaultProps = {
  score: 0,
  isOpen: false,
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
    () => {
      return {
        dispatch: {},
      };
    },
  ),
)(ScoreDisplay);
