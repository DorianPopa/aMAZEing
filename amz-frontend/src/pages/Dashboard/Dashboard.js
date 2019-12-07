import React, { Component } from "react";
import Card from "../../components/Maze/Card";
import PropTypes from "prop-types";
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
        <p>Sal</p>
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
