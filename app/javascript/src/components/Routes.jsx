import React from "react";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import routes from "constants/routes";

import Login from "./Account/Login";
import SetupProfile from "./Account/SetupProfile";
import Signup from "./Account/Signup";
import Dashboard from "./Dashbord";
import Users from "./Users";

const Routes = () => {
  const router = createBrowserRouter([
    { path: routes.login, Component: Login },
    { path: routes.signUp, Component: Signup },
    { path: routes.setupProfile, Component: SetupProfile },
    {
      Component: Dashboard,
      children: [
        { path: routes.users, Component: Users },
        { path: routes.home, element: <Navigate to={routes.users} /> },
      ],
    },
  ]);

  return (
    <RouterProvider fallbackElement={<p>Initial Load...</p>} router={router} />
  );
};

export default Routes;
