import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./components/Index";
import "./App.css";

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Index />} />
          </Routes>
        </div>
      </>
    </Router>
  );
};

export default App;
