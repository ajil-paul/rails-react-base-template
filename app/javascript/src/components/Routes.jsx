import routes from "constants/routes";

import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./Home";

const Routes = () => {
  const router = createBrowserRouter([{ path: routes.home, Component: Home }]);

  return (
    <RouterProvider fallbackElement={<p>Initial Load...</p>} router={router} />
  );
};

export default Routes;
