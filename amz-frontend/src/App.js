import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Config from "./config";

function App() {
  return (
    <div className="App">
      <Dashboard data={Config.dummy[Config.currentUserID]} />
    </div>
  );
}

export default App;
