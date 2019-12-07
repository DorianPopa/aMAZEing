import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Config from "./config";

function App() {
  let state = {
    player: {
      name: "player1",
      points: 200,
      mazeCount: 3,
      playedCount: 150,
    },
  };
  return (
    <div className="App">
      <Dashboard data={Config.dummy[Config.currentUserID]} player={state.player} />
    </div>
  );
}

export default App;
