import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Add from "./Add";
import Timeline from "./Timeline";

function App() {
  return (
    <Router>
      <div>
        <h1>TymeLyme</h1>

        <div>
          <button>
            <Link to="/add">Add new Event</Link>
          </button>
          <button>
            <Link to="/timeline">View Timeline</Link>
          </button>
        </div>

        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
