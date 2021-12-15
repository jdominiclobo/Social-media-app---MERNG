import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";

import { AuthProvider } from "./context/auth";

import MenuBar from "./components/MenuBar";
import Register from "./AuthPages/Register";
import Home from "./AuthPages/Home";
import Login from "./AuthPages/Login";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
