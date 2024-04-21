import React from "react";

import { Layout } from "antd";
import { useTranslation } from "react-i18next";

import Container from "components/Common/Container";
import Header from "components/Common/Header";
import PageLoader from "components/Common/PageLoader";
import useQueryParams from "hooks/commons/useQueryParams";
import { useFetchUsers } from "reactQuery/userUsersApi";

import Table from "./Table";

const Users = () => {
  const { t } = useTranslation();
  const filters = useQueryParams();

  const {
    data: users = [],
    isLoading,
    isFetching,
  } = useFetchUsers({ filters });

  if (isLoading) return <PageLoader />;

  return (
    <Layout>
      <Header title={t("titles.users")} />
      <Container>
        <Table loading={isFetching} rowData={users} />
      </Container>
    </Layout>
  );
};

export default Users;
