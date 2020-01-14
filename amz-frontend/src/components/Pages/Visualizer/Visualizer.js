import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import typy from "typy";
import { withAlert } from "react-alert";

import { compose } from "redux";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./Visualizer.scss";

class Visualizer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      restrict: false,
      isDataLoading: false,

      matrix: {},

      data: {
        title: "t",
        owner: "o",
      },
    };
  }

  componentDidMount() {
    document.title = this.props.title;
  }

  render() {
    return (
      <div className="Visualizer" data-restrict={this.state.restrict}>
        <div className="PageLoader" data-visible={this.state.isDataLoading}>
          <CircularProgress size={30} />
        </div>

        <div className="content">
          <div className="playground">
            <div className="title">
              <h1>
                Maze
                {this.state.data.title && this.state.data.owner ? (
                  <>
                    {" "}
                    <span>{this.state.data.title}</span> by <span>@{this.state.data.owner}</span>
                  </>
                ) : null}
              </h1>
            </div>
            <div className="board">
              <div className="container">
                <div
                  className="background"
                  style={{
                    width: this.state.piece * this.state.width,
                    height: this.state.piece * this.state.height,
                    gridTemplateColumns: `repeat(${this.state.width},1fr)`,
                    gridTemplateRows: `repeat(${this.state.height},1fr)`,
                  }}
                >
                  {Object.keys(typy(this.state, "matrix").safeObject).length > 0 ? this.renderPlayground() : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Visualizer.propTypes = {
  title: PropTypes.string.isRequired,
  store: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
    }),
    profile: PropTypes.shape({
      score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      mazeCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      mazePlayers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

      flagMazes: PropTypes.bool,
      flagProfile: PropTypes.bool,
      mazesSelf: PropTypes.arrayOf(PropTypes.shape({})),
      mazesPlayground: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default compose(
  withAlert(),
  connect(
    (store) => {
      return {
        store: {
          user: store.auth.user,
          profile: store.data.profile,
        },
      };
    },
    () => {
      return {};
    },
  ),
)(Visualizer);
