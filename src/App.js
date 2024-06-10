import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";

import "./App.css";

const App = () => (
  <Routes>
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/" element={<Home />} />;
  </Routes>
);

export default App;
