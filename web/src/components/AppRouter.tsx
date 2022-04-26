import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/register"
        element={
          <PrivateRoute>
            <Register />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
