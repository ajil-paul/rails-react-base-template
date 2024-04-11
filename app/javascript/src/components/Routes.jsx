import routes from "constants/routes";

import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./Account/Login";
import SetupProfile from "./Account/SetupProfile";
import Signup from "./Account/Signup";
import ProtectedRoute from "./Common/ProtectedRoute";
import Home from "./Home";

const Routes = () => {
  const router = createBrowserRouter([
    { path: routes.login, Component: Login },
    { path: routes.signUp, Component: Signup },
    { path: routes.setupProfile, Component: SetupProfile },
    {
      Component: ProtectedRoute,
      children: [{ path: routes.home, Component: Home }],
    },
  ]);

  return (
    <RouterProvider fallbackElement={<p>Initial Load...</p>} router={router} />
  );
};

export default Routes;
