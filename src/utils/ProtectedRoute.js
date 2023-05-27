import React from "react";
import { useNavigate, Route } from "react-router-dom";
import permissionGuard from "./permissionGuard";

export default ({ children, permission, ...routeProps }) => {
  const authToken = localStorage.getItem("eventi");
  const navigate = useNavigate();
  return (
    <Route
      {...routeProps}
      element={() => {
        if (authToken) {
          if (permissionGuard(permission)) {
            return children;
          } else {
            return navigate("/");
          }
        } else {
          return navigate("/login");
        }
      }}
    />
  );
};
