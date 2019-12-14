import React, { Component } from "react";
import Card from "../../Maze/Card";
import "./Dashboard.scss";

import Button from "../../Common/Button";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        name: "player_123",
        points: 200,
        mazeCount: 12,
        mazeList: [
          {
            mazeID: 1,
            number: 1,
            title: "Amazing maze",
            playerCount: 2,
          },
          {
            mazeID: 3,
            number: 2,
            title: "Bad maze",
            playerCount: 0,
          },
          {
            mazeID: 20,
            number: 3,
            title: "cola",
            playerCount: 20,
          },
        ],
      },
    };
  }

  render() {
    let i = 0;
    return (
      <div className="Dashboard">
        <div className="content">
          <div className="welcome">
            <p>Welcome, {this.state.player.name}</p>

            <Button
              type="edged"
              icon={{
                icon: true,
                source: "loupe",
                family: "round",
              }}
              title="Create maze"
            />

            <Button
              type="edged"
              theme="secondary"
              icon={{
                icon: true,
                source: "play_circle_filled",
                family: "round",
              }}
              title="Play this"
            />

            <div className="stat-card">
              <p>Your score</p>
              <p>{this.state.player.points}</p>
              <p>
                See Leaderboards <i className="material-icons">right</i>
              </p>
            </div>
            <div className="stat-card">
              <p>Your mazes</p>
              <p>{this.state.player.mazeCount}</p>
              <p>played by {this.state.player.playedCount} users</p>
            </div>
          </div>
          <div className="user_mazes">
            {this.state.player.mazeList.slice(0, 4).map((maze) => (
              <div key={++i} className="user_maze_card">
                <Card number={maze.number} title={maze.title} playerCount={maze.playerCount} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
