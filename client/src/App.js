import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";

import MenuBar from "./components/MenuBar";
import Register from "./AuthPages/Register";
import Home from "./AuthPages/Home";
import Login from "./AuthPages/Login";

const App = () => {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
