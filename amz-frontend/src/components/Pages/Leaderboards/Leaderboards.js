import React, { Component } from "react";

import "./Leaderboards.scss";

import Button from "../../Common/Button";
import Config from "../../../config/Config";
import Icon from "../../Common/Icon";

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
            {this.sortPlayers(this.players, this.sortByScore).map((player) => (
              <div key={++i} className="playerScore">
                <div className="place">
                  <p>{i}</p>
                </div>
                <div className="name">
                  <p>{player.name}</p>
                </div>
                <div className="score">
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

export default Leaderboards;
