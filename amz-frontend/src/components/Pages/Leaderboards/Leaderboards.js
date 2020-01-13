import React, { Component } from "react";
import PropTypes from "prop-types";
import { withAlert } from "react-alert";
import { compose } from "redux";
import { connect } from "react-redux";
import Icon from "../../Common/Icon";
import "./Leaderboards.scss";

class Leaderboards extends Component {
  players = [
    {
      name: "player1",
      score: 120,
    },
    {
      name: "player2",
      score: 140,
    },
    {
      name: "player3",
      score: 100,
    },
    {
      name: "player4",
      score: 20,
    },
    {
      name: "player5",
      score: 130,
    },
    {
      name: "player6",
      score: 150,
    },
    {
      name: "player7",
      score: 210,
    },
    {
      name: "player8",
      score: 180,
    },
    {
      name: "player9",
      score: 50,
    },
    {
      name: "player10",
      score: 120,
    },
  ];

  componentDidMount() {
    document.title = this.props.title;
  }

  sortPlayers = (players, mode) => {
    return players.sort(mode);
  };

  sortByName = (a, b) => {
    return a.name > b.name ? 1 : -1;
  };

  sortByScore = (a, b) => {
    if (a.score === b.score) return this.sortByName(a, b);
    return a.score < b.score ? 1 : -1;
  };

  render() {
    let i = 0;
    return (
      <div className="Leaderboards">
        <section className="content">
          <div className="top">
            <div className="title">
              <h2>Top players</h2>
            </div>
          </div>
          <div className="list">
            <div className="labels">
              <div className="placeLabel label">
                <p>Place</p>
              </div>
              <div className="iconLabel label">
                <p>Icon</p>
              </div>
              <div className="nameLabel label">
                <p>Name</p>
              </div>
              <div className="playedLabel label">
                <p>Played</p>
              </div>
              <div className="scoreLabel label">
                <p>Score</p>
              </div>
            </div>
            {this.sortPlayers(this.players, this.sortByScore).map((player) => (
              <div key={++i} className="playerScore">
                <div className="place cell">
                  <p>{i}</p>
                </div>
                <div className="box cell">
                  <Icon icon source="check" />
                </div>
                <div className="name cell">
                  <p>{player.name}</p>
                </div>
                <div className="played cell">
                  <p>2</p>
                </div>
                <div className="score cell">
                  <p>{player.score}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
}

Leaderboards.propTypes = {
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

Leaderboards.defaultProps = {};

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
)(Leaderboards);