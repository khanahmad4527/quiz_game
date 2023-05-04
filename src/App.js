import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Quiz from "./components/Quiz/Quiz";
import Results from "./components/Results/Results";
import Dashboard from "./components/Dashboard/Dashboard";
import { useSelector } from "react-redux";

const App = () => {
  const { isAuth } = useSelector((store) => store);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={isAuth && <Quiz />} />
      <Route path="/results" element={isAuth && <Results />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
