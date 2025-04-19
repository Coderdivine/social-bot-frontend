import React from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import XPage from "../pages/XPage";
import Navbar from "../components/Navbar";

export default function AppRoutes() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/x" element={<XPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
