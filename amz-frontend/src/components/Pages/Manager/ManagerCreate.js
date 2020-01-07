import React, { Component } from "react";
import Button from "../../Common/Button";
import "./Manager.scss";
import Config from "../../../config";
import Block from "../../Common/Block/Block";
import PanelItem from "../../Specific/Manager/PanelItem";

class ManagerCreate extends Component {
  constructor(props) {
    super(props);

    const piece = parseInt(Config.theme.sizePiece, 12);

    this.state = {
      piece,
      width: parseInt(890 / piece, 10),
      height: parseInt(510 / piece, 10),
      chosen: Config.BLOCK_TYPE.SIMPLE,
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

    this.state.available = this.computeAvailableBlocks(false);
  }

  computeAvailableBlocks(save = true) {
    let maxStartBlocks = 1;
    let maxFinishBlocks = 1;
    let maxSimpleBlocks = this.state.width * this.state.height - maxStartBlocks - maxFinishBlocks;

    for (let i = 0; i < this.state.height; i++)
      for (let j = 0; j < this.state.width; j++) {
        switch (this.state.matrix[i][j]) {
          case Config.BLOCK_TYPE.SIMPLE:
            maxSimpleBlocks--;
            break;
          case Config.BLOCK_TYPE.START:
            maxStartBlocks = 0;
            break;
          case Config.BLOCK_TYPE.FINISH:
            maxFinishBlocks = 0;
            break;
          default:
            break;
        }
      }

    const result = {};
    result[Config.BLOCK_TYPE.SIMPLE] = maxSimpleBlocks;
    result[Config.BLOCK_TYPE.START] = maxStartBlocks;
    result[Config.BLOCK_TYPE.FINISH] = maxFinishBlocks;

    if (save) this.setState({ available: result });

    return result;
  }

  onChosenPick(type) {
    this.setState({ chosen: type }, this.computeAvailableBlocks);
  }

  onBlockPick(line, column) {
    if (this.state.matrix[line][column] !== this.state.chosen && this.state.available[this.state.chosen] === 0) return;

    this.setState((prev) => {
      const { matrix, chosen } = prev;
      matrix[line][column] = matrix[line][column] === chosen ? Config.BLOCK_TYPE.EMPTY : chosen;
      return {
        matrix,
      };
    }, this.computeAvailableBlocks);
  }

  render() {
    return (
      <div className="Manager create">
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
            <div className="actions">
              <div className="title">
                <h3>Info</h3>
              </div>
            </div>
          </div>
          <div className="panel">
            <div className="content">
              <div className="title">
                <h3>Building blocks</h3>
              </div>
              <div className="pieces">
                {[
                  [Config.BLOCK_TYPE.SIMPLE, "Simple"],
                  [Config.BLOCK_TYPE.START, "Start"],
                  [Config.BLOCK_TYPE.FINISH, "Finish"],
                ].map(([type, name]) => (
                  <PanelItem
                    key={name}
                    available={this.state.available[type]}
                    matrix={[0, 0, 0, 0, type, 0, 0, 0, 0]}
                    name={name}
                    isSelected={this.state.chosen === type}
                    onClick={() => this.onChosenPick(type)}
                  />
                ))}
              </div>
            </div>
            <div className="actions">
              <Button
                type="edged"
                theme="light"
                icon={{
                  icon: true,
                  source: "close",
                  family: "round",
                }}
                title="Cancel"
              />
              <Button
                type="edged"
                theme="primary"
                icon={{
                  icon: true,
                  source: "check",
                  family: "round",
                }}
                title="Save maze"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManagerCreate;
