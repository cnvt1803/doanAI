import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import LoginText from "./pages/loginmain";
import Page1 from "./pages/page1";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginmain" element={<LoginText />} />
        <Route path="/page1" element={<Page1 />} />
      </Routes>
    </Router>
  );
};

export default App;
