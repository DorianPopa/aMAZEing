import React, { Component } from "react";
import "./DashNavBar.scss";

class DashNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="navbar">
        <div className="logo">
          <p>Logo</p>
        </div>
        <div className="buttons">
          {/* <Button color="blue" text="Create maze" shape="shapeless" />
          <div className="pages">
            <Button color="white" text="Dashboard" shape="shapeless" />
            <Button color="white" text="Leaderboards" shape="shapeless" />
            <Button color="purple" text="player1" shape="shapeless" />
          </div> */}
        </div>
      </div>
    );
  }
}

export default DashNavBar;
