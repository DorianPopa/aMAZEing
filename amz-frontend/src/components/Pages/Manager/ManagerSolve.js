import React, { Component } from "react";
import typy from "typy";
import Button from "../../Common/Button";
import { Config } from "../../../base";
import Block from "../../Common/Block/Block";
import "./Manager.scss";

class ManagerSolve extends Component {
  constructor(props) {
    super(props);

    const piece = parseInt(Config.theme.sizePiece, 10);

    this.state = {
      piece,
      width: 0,
      height: 0,
      matrix: {},
      solution: {},
      source: [
        [1, 1, Config.BLOCK_TYPE.SIMPLE],
        [1, 2, Config.BLOCK_TYPE.SIMPLE],
        [1, 3, Config.BLOCK_TYPE.SIMPLE],
        [10, 1, Config.BLOCK_TYPE.START],
        [9, 1, Config.BLOCK_TYPE.FINISH],
      ],
    };
  }

  componentDidMount() {
    this.configure();
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
        prev.source.forEach((block) => {
          const [line, column, type] = block;
          matrix[line][column] = type;
        });
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
      <div className="Manager solve">
        <div className="content">
          <div className="playground">
            <div className="title">
              <h1>Map</h1>
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
                  {Object.keys(typy(this.state, "matrix").safeObject).length > 0
                    ? [...Array(this.state.height).keys()].map((line) =>
                        [...Array(this.state.width).keys()].map((column) => (
                          <Block
                            key={`l${line}c${column}`}
                            type={this.state.matrix[line][column]}
                            onClick={() => {
                              this.onBlockPick(line, column);
                            }}
                          />
                        )),
                      )
                    : null}
                </div>
              </div>
            </div>
          </div>
          <div className="panel">
            <div className="content">
              <div className="title">
                <h3>Stats</h3>
              </div>
              <p className="info">Blocks used: {this.state.solution.used}</p>

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
                <p className="info">
                  Once you visualize the algorithmic solution of this maze, your score will be automatically set to 0
                  for this game.
                </p>
                <div className="buttons">
                  <Button type="edged" theme="light" title="View solution" />
                  <Button
                    type="edged"
                    theme="solution"
                    icon={{
                      icon: true,
                      source: "flash_on",
                      family: "round",
                    }}
                    title="Save maze"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManagerSolve;
