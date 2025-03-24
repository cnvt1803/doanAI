import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import LoginText from "./pages/loginmain";
import Page1 from "./pages/pageone/page1";
import Notification from "./pages/notification/notification";
import Envi from "./pages/enviromental/enviromental";
import Graph from "./pages/graph/graph";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginmain" element={<LoginText />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/enviromental" element={<Envi />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
    </Router>
  );
};

export default App;
