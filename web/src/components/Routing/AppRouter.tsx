import React from "react";
import { Routes, Route } from "react-router-dom";
import Extracts from "../../pages/Extracts";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Users from "../../pages/Users";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

const adminRoutes = [
  { path: "/users", component: <Users /> },
  { path: "/extracts", component: <Extracts /> },
];

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      {adminRoutes.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<AdminRoute>{route.component}</AdminRoute>}
          />
        );
      })}
    </Routes>
  );
};

export default AppRouter;
