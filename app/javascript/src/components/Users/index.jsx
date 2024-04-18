import React from "react";

import { Layout } from "antd";
import Container from "components/Common/Container";
import Header from "components/Common/Header";
import { useTranslation } from "react-i18next";
import { useFetchUsers } from "reactQuery/userUsersApi";

import Table from "./Table";

const Users = () => {
  const { t } = useTranslation();
  const { data: users = [] } = useFetchUsers();

  return (
    <Layout>
      <Header title={t("titles.users")} />
      <Container>
        <Table rowData={users} />
      </Container>
    </Layout>
  );
};

export default Users;
