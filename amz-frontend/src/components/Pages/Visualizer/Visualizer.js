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
      order: {},
      restrict: false,
      isDataLoading: false,
      isFetchFired: false,

      data: {
        title: "t",
        owner: "o",
      },
      result: {},
      totalDelay: 0,
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
    this.fetchPlainSolution();
    this.fetchMaze();
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  fetchMazeSolution = async () => {
    console.log("result", this.state.result);

    const payload = {
      name: "Not needed",
      width: this.state.result.width,
      height: this.state.result.height,
      pointlist: this.state.result.state,
    };

    const response = await Network.fetchMazeSolution(
      this.props.store.user,
      payload,
      typy(this, "props.match.params.type").safeString,
    );

    const { status } = response;
    const result = await response.json();

    console.log(status, result);

    setTimeout(() => {
      this.startAnimation(result);
    }, 1000);

    this.setState({ isFetchFired: false });
  };

  startAnimation = (result) => {
    const visited = {};
    const solution = {};

    result.visitedPoints.forEach((point) => {
      if (visited[point.value] === undefined) visited[point.value] = [];
      visited[point.value].push({ i: point.i, j: point.j });
    });

    result.solution.forEach((point) => {
      solution[point.value] = { i: point.i, j: point.j };
    });

    console.log(visited);
    console.log(solution);

    this.setState(
      (prev) => {
        const order = this.copyStateOrder(prev);
        const matrix = this.copyStateMaze(prev);

        let delay = 0;

        Object.keys(visited).forEach((key) => {
          const step = visited[key];

          step.forEach(({ i, j }) => {
            order[i][j] = {
              isAnimated: true,
              delay: `${delay}ms`,
            };
            matrix[i][j] = Config.BLOCK_TYPE.VISITED;
          });
          delay += 400;
        });

        return {
          order,
          matrix,
          totalDelay: delay,
        };
      },
      () => {
        setTimeout(() => {
          this.setState(
            (prev) => {
              const matrix = this.copyStateMaze(prev);
              const order = this.copyStateOrder(prev);

              Object.keys(visited).forEach((key) => {
                visited[key].forEach(({ i, j }) => {
                  order[i][j] = {
                    isAnimated: false,
                    delay: "0ms",
                  };
                  matrix[i][j] = Config.BLOCK_TYPE.EMPTY;
                });
              });
            },
            () => {
              setTimeout(() => {
                this.setState((prev) => {
                  const order = this.copyStateOrder(prev);
                  const matrix = this.copyStateMaze(prev);

                  let delay = 0;

                  Object.keys(visited).forEach((key) => {
                    order[solution[key].i][solution[key].j] = {
                      isAnimated: true,
                      delay: `${delay}ms`,
                    };
                    matrix[solution[key].i][solution[key].j] = Config.BLOCK_TYPE.SOLUTION;

                    delay += 400;
                  });

                  return {
                    order,
                    matrix,
                    totalDelay: delay,
                  };
                });
              }, 1000);
            },
          );
        }, this.state.totalDelay);
      },
    );

    // this.setState((prev) => {
    //   const order = this.copyStateOrder(prev);

    //   let delay = 0;

    //   Object.keys(visited).forEach((key) => {
    //     const step = visited[key];
    //     console.log(step);
    //     step.forEach(({ i, j }) => {
    //       console.log(solution[key], { i, j });
    //       order[i][j] = {
    //         isAnimated: true,
    //         delay: `${delay}ms`,
    //       };
    //     });
    //     delay += 200;
    //   });

    //   return {
    //     order,
    //     totalDelay : delay,
    //   };
    // },()=>{

    // });
  };

  fetchPlainSolution = async () => {
    this.setState({ isPlainSolutionFired: true });
    const response = await Network.fetchMazePlainSolution(
      this.props.store.user,
      typy(this, "props.match.params.id").safeString,
    );

    console.log("saw solution", response);
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
        <Block
          isAnimated={this.state.order[line][column].isAnimated}
          delay={this.state.order[line][column].delay}
          isHoverEnabled={false}
          key={`l${line}c${column}`}
          type={this.state.matrix[line][column]}
        />
      )),
    );
  }

  configure = () => {
    this.setState((prev) => {
      const matrix = {};
      const order = {};
      const width = parseInt(890 / prev.piece, 10);
      const height = parseInt(510 / prev.piece, 10);

      for (let i = 0; i < height; i++)
        for (let j = 0; j < width; j++) {
          if (matrix[i] === undefined) matrix[i] = {};
          if (order[i] === undefined) order[i] = {};

          matrix[i][j] = Config.BLOCK_TYPE.EMPTY;
          order[i][j] = { isAnimated: false, delay: 0, type: null };
        }

      return {
        order,
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

  copyStateOrder = (prev) => {
    const o = {};
    [...Array(prev.height).keys()].forEach((line) => {
      [...Array(prev.width).keys()].forEach((column) => {
        if (o[line] === undefined) o[line] = {};
        o[line][column] = prev.order[line][column];
      });
    });

    return o;
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
