import React, { Component } from "react";

import "./Dashboard.scss";

import Button from "../../Common/Button";
import Config from "../../../config/Config";

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <header>
          <div className="content">
            <div className="title">
              <h1>
                Welcome <span>@player123</span>
              </h1>
            </div>
            <div className="cards"></div>
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
                theme="outline-gray"
                icon={{
                  icon: true,
                  source: "show_cart",
                  family: "round",
                }}
                style={{}}
                title="Play this"
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
          <div className="grid"></div>
        </section>
      </div>
    );
  }
}

export default Dashboard;
