import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import routes from "constants/routes";

const ProtectedRoute = () => {
  const user = window.userDetails;

  if (!user?.email) return <Navigate replace to={routes.login} />;

  if (
    !user.isProfileCompleted &&
    window.location.pathname !== routes.setupProfile
  ) {
    return <Navigate replace to={routes.setupProfile} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
