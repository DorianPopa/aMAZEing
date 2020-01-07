import React, { Component } from "react";
import Button from "../../Common/Button";
import "./Manager.scss";
import Config from "../../../config";
import Block from "../../Common/Block/Block";

class ManagerSolve extends Component {
  constructor(props) {
    super(props);

    const piece = parseInt(Config.theme.sizePiece, 12);

    this.state = {
      piece,
      width: parseInt(890 / piece, 10),
      height: parseInt(510 / piece, 10),
      source: [
        [1, 1, Config.BLOCK_TYPE.SIMPLE],
        [1, 2, Config.BLOCK_TYPE.SIMPLE],
        [1, 3, Config.BLOCK_TYPE.SIMPLE],
        [10, 1, Config.BLOCK_TYPE.START],
        [9, 1, Config.BLOCK_TYPE.FINISH],
      ],
    };

    this.configure();
  }

  configure() {
    const matrix = {};

    for (let i = 0; i < this.state.height; i++)
      for (let j = 0; j < this.state.width; j++) {
        if (matrix[i] === undefined) matrix[i] = {};
        matrix[i][j] = Config.BLOCK_TYPE.EMPTY;
      }

    this.state.matrix = matrix;

    this.state.source.forEach((block) => {
      const [line, column, type] = block;
      matrix[line][column] = type;
    });

    this.state.solution = this.computeSolutionBlocks(false);
  }

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
                  {[...Array(this.state.height).keys()].map((line) =>
                    [...Array(this.state.width).keys()].map((column) => (
                      <Block
                        key={`l${line}c${column}`}
                        type={this.state.matrix[line][column]}
                        onClick={() => {
                          this.onBlockPick(line, column);
                        }}
                      />
                    )),
                  )}
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
