import React from "react";

import { Layout } from "antd";
import Container from "components/Common/Container";
import Header from "components/Common/Header";
import { useFetchUsers } from "reactQuery/userUsersApi";

const Users = () => {
  useFetchUsers();

  return (
    <Layout>
      <Header
        breadcrumbs={[{ title: "Users", path: "/dashboard" }]}
        title="Users"
      />
      <Container>User list</Container>
    </Layout>
  );
};

export default Users;
