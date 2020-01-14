/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import typy from "typy";
import { withAlert } from "react-alert";

import { compose } from "redux";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./Visualizer.scss";
import { Config, Network } from "../../../base";
import Block from "../../Common/Block/Block";

class Visualizer extends PureComponent {
  constructor(props) {
    super(props);

    const piece = parseInt(Config.theme.sizePiece, 10);

    this.state = {
      piece,
      width: 0,
      height: 0,
      matrix: {},
      restrict: false,
      isDataLoading: false,
      isFetchFired: false,

      data: {
        title: "t",
        owner: "o",
      },
      result: {},
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
    document.title = this.props.title;
    this.configure();
    this.fetchMaze();
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  fetchMazeSolution = async () => {
    console.log("result", this.state.result);

    const response = await Network.fetchMazeSolution(
      this.props.store.user,
      {
        width: this.state.result.width,
        height: this.state.result.height,
        pointlist: this.state.result.pointlist,
      },
      typy(this, "props.match.params.type").safeString,
    );

    const { status } = response;
    // const result = await response.json();

    console.log(status, response);

    this.setState({ isFetchFired: false });
  };

  fetchMaze = async () => {
    this.setState({ isFetchFired: true });
    if (typy(this, "props.match.params.id").isNullOrUndefined) this.props.history.push(Config.ROUTE_PAGE_DASHBOARD);
    const response = await Network.fetchMaze(this.props.store.user, typy(this, "props.match.params.id").safeString);

    const { status } = response;
    const result = await response.json();

    console.log(status, result);

    if (!this.isMounted) return;

    switch (status) {
      case Config.HTTP_STATUS.OK: {
        const { name, playersCount, owner } = result;

        this.setState(
          (prev) => {
            const m = {};

            [...Array(prev.height).keys()].forEach((line) => {
              [...Array(prev.width).keys()].forEach((column) => {
                if (m[line] === undefined) m[line] = {};
                m[line][column] = prev.matrix[line][column];
              });
            });

            result.state.forEach((point) => {
              m[typy(point, "i").safeNumber][typy(point, "j").safeNumber] = typy(point, "value").safeNumber;
            });

            return {
              matrix: m,
              result,
              data: {
                title: name,
                owner,
                playersCount,
              },
            };
          },
          () => {
            this.fetchMazeSolution();
          },
        );

        break;
      }
      case Config.HTTP_STATUS.NOT_FOUND:
      case Config.HTTP_STATUS.BAD_REQUEST: {
        this.setState({ restrict: true });
        this.props.alert.show("The maze you're looking for is not available.", {
          type: "warn",
          timeout: 3000,
          isClosable: false,
        });
        setTimeout(() => {
          this.props.history.push(Config.ROUTE_PAGE_DASHBOARD);
        }, 3000);
        break;
      }
      case Config.HTTP_STATUS.UNAUHTORIZED: {
        Network.EMERGENCY();
        break;
      }
      default:
        break;
    }
  };

  renderPlayground() {
    return [...Array(this.state.height).keys()].map((line) =>
      [...Array(this.state.width).keys()].map((column) => (
        <Block isHoverEnabled={false} key={`l${line}c${column}`} type={this.state.matrix[line][column]} />
      )),
    );
  }

  configure = () => {
    this.setState((prev) => {
      const matrix = {};
      const width = parseInt(890 / prev.piece, 10);
      const height = parseInt(510 / prev.piece, 10);

      for (let i = 0; i < height; i++)
        for (let j = 0; j < width; j++) {
          if (matrix[i] === undefined) matrix[i] = {};
          matrix[i][j] = Config.BLOCK_TYPE.EMPTY;
        }

      return {
        height,
        width,
        matrix,
      };
    });
  };

  copyStateMaze = (prev) => {
    const m = {};
    [...Array(prev.height).keys()].forEach((line) => {
      [...Array(prev.width).keys()].forEach((column) => {
        if (m[line] === undefined) m[line] = {};
        m[line][column] = prev.matrix[line][column];
      });
    });

    return m;
  };

  render() {
    const type = typy(this, "props.match.params.type").safeString;

    return (
      <div className="Visualizer" data-restrict={this.state.restrict}>
        <div className="PageLoader" data-visible={this.state.isFetchFired}>
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
                    <span>{this.state.data.title}</span> by <span>@{this.state.data.owner}</span> with{" "}
                    <span>
                      {type === Config.SOLUTION_ALGORIGHM.BFS
                        ? "BFS"
                        : type === Config.SOLUTION_ALGORIGHM.BIDIRECTIONAL_BFS
                        ? "Bidirectional BFS"
                        : "A*"}
                    </span>
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
  alert: PropTypes.shape({
    show: PropTypes.func,
    removeAll: PropTypes.func,
  }).isRequired,
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
