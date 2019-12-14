import React, { Component } from "react";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import Button from "../../Common/Button";
import "./Manager.scss";
import Piece from "../../Common/Piece";

import Config from "../../../config";
import Block from "../../Common/Block/Block";

class Manager extends Component {
  constructor(props) {
    super(props);

    const piece = parseInt(Config.theme.sizePiece, 10);

    this.state = {
      piece,
      width: parseInt(890 / piece, 10),
      height: parseInt(510 / piece, 10),

      dragged: null,
    };

    const matrix = {};

    for (let i = 0; i < this.state.height; i++)
      for (let j = 0; j < this.state.width; j++) {
        if (matrix[i] === undefined) matrix[i] = {};
        matrix[i][j] = {
          line: i,
          column: j,
          type: "map",
        };
      }

    this.state.matrix = matrix;
  }

  setDragged = (dragged) => {
    this.setState({ dragged });
  };

  handleIsDroppedOnCanvas = (line, column) => {
    if (!this.state.dragged) return;

    this.setState((prevState) => {
      const { matrix, dragged } = prevState;

      const lineMax = Math.min(line + dragged.size, prevState.height);
      const columnMax = Math.min(column + dragged.size, prevState.width);

      for (let i = line; i < lineMax; i++)
        for (let j = column; j < columnMax; j++) {
          console.log(dragged.size - (lineMax - i) + dragged.size - (columnMax - j));
          matrix[i][j].type = dragged.matrix[
            (dragged.size - (lineMax - i)) * dragged.size + dragged.size - (columnMax - j)
          ]
            ? "simple"
            : "map";
        }

      return {
        matrix,
      };
    });
  };

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="Manager">
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
                          canvas
                          line={line}
                          column={column}
                          key={`l${line}c${column}`}
                          type={this.state.matrix[line][column].type}
                          handleIsDroppedOnCanvas={this.handleIsDroppedOnCanvas}
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
                  <h3>Pieces</h3>
                </div>
                <div className="pieces">
                  <div className="item">
                    <Piece setDragged={this.setDragged} />
                  </div>
                  <div className="item">
                    <Piece setDragged={this.setDragged} matrix={[1, 1, 1, 1, 1, 1, 1, 1, 1]} />
                  </div>
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
      </DndProvider>
    );
  }
}

export default Manager;
