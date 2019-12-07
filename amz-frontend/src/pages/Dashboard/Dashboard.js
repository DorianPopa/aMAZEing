import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "../../components/Maze/Card";
import Button from "../../components/Button";
import DashNavBar from "../../components/DashNavBar";
import "./Dashboard.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getUserMazes = () => {
    return this.props.data.mazes;
  };

  render() {
    let i = 0;
    return (
      <div className="dashboard">
        <DashNavBar />
        <div className="welcome">
          <p>Welcome, {this.props.player.name}</p>
          <div className="stat-card">
            <p>Your score</p>
            <p>{this.props.player.points}</p>
            <p>
              See Leaderboards <i className="material-icons">right</i>
            </p>
          </div>
          <div className="stat-card">
            <p>Your mazes</p>
            <p>{this.props.player.mazeCount}</p>
            <p>played by {this.props.player.playedCount} users</p>
          </div>
        </div>
        <div className="user_mazes">
          {this.getUserMazes(1)
            .slice(0, 4)
            .map((maze) => (
              <div key={++i} className="user_maze_card">
                <Card number={maze.number} title={maze.title} playerCount={maze.playerCount} />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  data: PropTypes.shape({
    mazes: PropTypes.array,
  }).isRequired,
  opt: PropTypes.string,
};
Dashboard.defaultProps = {
  opt: "mama",
};

export default Dashboard;
