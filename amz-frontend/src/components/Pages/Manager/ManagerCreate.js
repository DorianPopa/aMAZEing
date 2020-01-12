import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import typy from "typy";
import { withAlert } from "react-alert";
import { compose } from "redux";
import { connect } from "react-redux";
import Button from "../../Common/Button";
import { Config } from "../../../base";
import Block from "../../Common/Block/Block";
import PanelItem from "../../Specific/Manager/PanelItem";
import { SaveMazeModal, CancelMazeCreateModal } from "../../Structure/Modal/Template";

import "./Manager.scss";

class ManagerCreate extends PureComponent {
  constructor(props) {
    super(props);

    const piece = parseInt(Config.theme.sizePiece, 10);

    this.state = {
      piece,
      width: 0,
      height: 0,
      chosen: Config.BLOCK_TYPE.SIMPLE,
      matrix: {},
      available: {},

      mazeName: "",
      mazeNameWarn: false,
      isSaveModalOpen: false,
      isSavingFired: false,
      isCancelMazeCreateModalOpen: false,
    };
  }

  componentDidMount() {
    this.configure();
  }

  renderPlayground() {
    return [...Array(this.state.height).keys()].map((line) =>
      [...Array(this.state.width).keys()].map((column) => (
        <Block
          isHoverEnabled={[Config.BLOCK_TYPE.EMPTY, Config.BLOCK_TYPE.SOLUTION].includes(
            this.state.matrix[line][column],
          )}
          key={`l${line}c${column}`}
          type={this.state.matrix[line][column]}
          onClick={() => {
            this.onBlockPick(line, column);
          }}
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
          available: this.computeAvailableBlocks(false),
        });
      },
    );
  };

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

  onSave = () => {
    if (typy(this.state, "mazeName").isEmptyString) {
      this.props.alert.show("Please add a valid Maze name.", { type: "error" });
      this.setState({ mazeNameWarn: true });
    }
  };

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
                  {Object.keys(typy(this.state, "matrix").safeObject).length > 0 ? this.renderPlayground() : null}
                </div>
              </div>
            </div>
            <div className="actions">
              <div className="title">
                <h3>Info</h3>
              </div>
              <div className="buttons">
                <Button type="edged" theme="solution" title="Show solution" />
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
                onClick={() => {
                  this.setState({ isCancelMazeCreateModalOpen: true });
                }}
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
                onClick={() => {
                  this.setState({ isSaveModalOpen: true });
                }}
              />
            </div>
          </div>
        </div>
        <SaveMazeModal
          onClose={() => {
            this.setState({ isSaveModalOpen: false, mazeName: "" });
          }}
          isOpen={this.state.isSaveModalOpen}
          onSave={this.onSave}
          mazeName={this.state.mazeName}
          toggleMazeName={(value) => {
            this.setState({ mazeName: value, mazeNameWarn: false });
          }}
          mazeNameWarn={this.state.mazeNameWarn}
          isSavingFired={this.state.isSavingFired}
        />

        <CancelMazeCreateModal
          isOpen={this.state.isCancelMazeCreateModalOpen}
          onClose={() => {
            this.setState({ isCancelMazeCreateModalOpen: false });
          }}
          onCancel={() => {
            this.props.history.replace(Config.ROUTE_PAGE_DASHBOARD);
          }}
        />
      </div>
    );
  }
}

ManagerCreate.propTypes = {
  alert: PropTypes.shape({
    show: PropTypes.func,
    removeAll: PropTypes.func,
  }).isRequired,
  store: PropTypes.shape({
    user: PropTypes.shape({}),
  }).isRequired,
  dispatch: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
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
)(ManagerCreate);
