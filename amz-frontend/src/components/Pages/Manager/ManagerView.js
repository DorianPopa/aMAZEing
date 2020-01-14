/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import typy from "typy";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withAlert } from "react-alert";
import { compose } from "redux";
import { connect } from "react-redux";
import Button from "../../Common/Button";
import { Config, Network } from "../../../base";
import Block from "../../Common/Block/Block";
import "./Manager.scss";
import { RequestSolutionModal } from "../../Structure/Modal/Template";

class ManagerView extends PureComponent {
  constructor(props) {
    super(props);

    const piece = parseInt(Config.theme.sizePiece, 10);

    this.state = {
      piece,
      width: 0,
      height: 0,
      matrix: {},
      solution: {},
      source: {},
      data: {
        title: "",
        playersCount: 0,
      },

      isFetchFired: false,
      isRequestAlgorithmicFired: null,
      isPlainSolutionFired: false,

      isRequestSolutionModalOpen: false,
      isAccuracyModalOpen: false,
      isSolutionRequestFired: false,

      restrict: false,
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

  fetchPlainSolution = async () => {
    this.setState({ isPlainSolutionFired: true });
    const response = await Network.fetchMazePlainSolution(
      this.props.store.user,
      typy(this, "props.match.params.id").safeString,
    );

    console.log(response);

    const { status } = response;
    const result = await response.json();

    if (!this.isMounted) return;

    switch (status) {
      case Config.HTTP_STATUS.OK: {
        const { name, playersCount } = result;
        this.setState((prev) => {
          const m = { ...prev.matrix };

          result.solution.forEach((point) => {
            m[typy(point, "i").safeNumber][typy(point, "j").safeNumber] = Config.BLOCK_TYPE.SOLUTION;
          });

          return {
            isFetchFired: false,
            data: {
              matrix: m,
              title: name,
              playersCount,
            },
          };
        });
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
        const { name, playersCount } = result;

        this.setState((prev) => {
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
            isFetchFired: false,
            matrix: m,
            data: {
              title: name,
              playersCount,
            },
          };
        });

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
        <Block
          isHoverEnabled={false}
          key={`l${line}c${column}`}
          type={this.state.matrix[line][column]}
          onClick={() => {}}
        />
      )),
    );
  }

  configure = () => {
    this.setState(
      (prev) => {
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
      },
      () => {
        this.setState({
          solution: this.computeSolutionBlocks(false),
        });
      },
    );
  };

  computeSolutionBlocks(save = true) {
    let used = 0;

    for (let i = 0; i < this.state.height; i++)
      for (let j = 0; j < this.state.width; j++) {
        switch (this.state.matrix[i][j]) {
          case Config.BLOCK_TYPE.SOLUTION:
            used++;
            break;
          default:
            break;
        }
      }

    const solution = {};
    solution.used = used;

    if (save) this.setState({ solution });

    return solution;
  }

  onBlockPick(line, column) {
    if (![Config.BLOCK_TYPE.SOLUTION, Config.BLOCK_TYPE.EMPTY].includes(this.state.matrix[line][column])) return;

    this.setState((prev) => {
      const { matrix } = prev;
      matrix[line][column] =
        matrix[line][column] === Config.BLOCK_TYPE.SOLUTION ? Config.BLOCK_TYPE.EMPTY : Config.BLOCK_TYPE.SOLUTION;
      return {
        matrix,
      };
    }, this.computeSolutionBlocks);
  }

  render() {
    return (
      <div className="Manager view" data-restrict={this.state.restrict}>
        <div className="PageLoader" data-visible={this.state.isFetchFired || this.state.isPlainSolutionFired}>
          <CircularProgress size={30} />
        </div>
        <div className="content">
          <div className="playground">
            <div className="title">
              <h1>
                Maze
                {this.state.data.title ? (
                  <>
                    {" "}
                    <span>{this.state.data.title}</span> by <span>You</span>
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
          <div className="panel">
            <div className="content">
              <div className="title">
                <h3>Stats</h3>
              </div>
              <p className="info">Players: {this.state.data.playersCount}</p>

              <div className="title">
                <h3>Map</h3>
              </div>

              <div className="size">
                <div className="box">
                  <p className="title">Height</p>
                  <p className="value">
                    <span>{this.state.height}</span> blocks
                  </p>
                </div>
                <div className="box">
                  <p className="title">Width</p>
                  <p className="value">
                    <span>{this.state.width}</span> blocks
                  </p>
                </div>
              </div>
              <div className="bottom">
                <div className="buttons">
                  <Button
                    type="edged"
                    theme="solution"
                    icon={{
                      icon: true,
                      source: "flash_on",
                      family: "round",
                    }}
                    title="View algorithmic solution"
                    onClick={() => {
                      this.setState({ isRequestSolutionModalOpen: true });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <RequestSolutionModal
          isSelf
          isRequestFired={this.state.isRequestAlgorithmicFired}
          isOpen={this.state.isRequestSolutionModalOpen}
          onClose={() => {
            this.setState({ isRequestSolutionModalOpen: false });
          }}
          onSubmit={(type) => {
            this.props.history.push(
              Config.ROUTE_BUILDER_PAGE_MAZE_VISUALIZER(typy(this, "props.match.params.id").safeString, type),
            );
          }}
        />
      </div>
    );
  }
}

ManagerView.propTypes = {
  title: PropTypes.string.isRequired,
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
  history: PropTypes.shape({
    replace: PropTypes.func,
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
        },
      };
    },
    () => {
      return {
        dispatch: {},
      };
    },
  ),
)(ManagerView);
