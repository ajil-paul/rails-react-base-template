import React from "react";

import { Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";

import routes from "constants/routes";

import Sidebar from "./Sidebar";

const Dashboard = () => {
  const user = window.userDetails;

  if (!user || !user?.email || !user.role) {
    return <Navigate replace to={routes.login} />;
  }

  // const isStandardUser = user.role === ROLE.STANDARD;

  // if (isStandardUser) return <Navigate replace to={routes.home} />;

  return (
    <Layout className="h-screen">
      <Sidebar />
      <Outlet />
    </Layout>
  );
};

export default Dashboard;
