import React, { Component } from "react";

import "./Dashboard.scss";

import Button from "../../Common/Button";
import Config from "../../../config/Config";
import StatCard from "../../Specific/Dashboard/StatCard";
import Icon from "../../Common/Icon";

import { ReactComponent as DashboardIllustration } from "../../../assets/images/dashboard_illustration.svg";
import MazeSelfCard from "../../Common/Maze/MazeSelfCard/MazeSelfCard";
import MazeCard from "../../Common/Maze/MazeCard/MazeCard";

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <header>
          <div className="content stats">
            <div className="title">
              <h1>
                Welcome <span>@player123</span>
              </h1>
            </div>
            <div className="cards">
              <StatCard
                title="Your Score"
                value="200 pts"
                onClick={() => {
                  console.log("Go to Leaderboards");
                }}
              >
                <div className="statCardButton">
                  <p className="title">See Leaderboards</p>
                  <Icon icon source="arrow_forward" family="round" />
                </div>
              </StatCard>

              <StatCard title="Your mazes" value="3 mazes">
                <div className="statCardPlayers">
                  <p className="title">played by 200 users</p>
                </div>
              </StatCard>
            </div>
            <DashboardIllustration className="illustration" />
          </div>

          <div className="underlay">
            <div />
          </div>
        </header>
        <section className="content self">
          <div className="top">
            <div className="title">
              <h2>Your mazes</h2>
            </div>
            <div className="actions">
              <Button
                type="edged"
                theme="gray"
                icon={{
                  icon: true,
                  source: "show_chart",
                  family: "round",
                }}
                style={{}}
                title="See stats"
              />
              <Button
                type="edged"
                icon={{
                  icon: true,
                  source: "loupe",
                  family: "round",
                }}
                title="Create maze"
                to={Config.ROUTE_PAGE_MAZE_MANAGER_CREATE}
              />
            </div>
          </div>
          <div className="grid">
            <MazeSelfCard index="1" players={1} title="Maze_Name 39 row row row row row row row row row" />
            <MazeSelfCard index="2" title="Awesome maze" />
            <MazeSelfCard index="3" players={2201} title="Incredible maze" />
            <MazeSelfCard index="4" players={3} title="Incredible maze  22222 sadsad sad sa" />
          </div>
        </section>

        <section className="content playground">
          <div className="top">
            <div className="title">
              <h2>Playground</h2>
            </div>
          </div>
          <div className="grid">
            <MazeCard index="34A" username="Tanase" title="Crazy path finder" />
            <MazeCard index="12" username="Razgraf" title="My maze" />
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;
