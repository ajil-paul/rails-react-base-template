import { t } from "i18next";

export const buildColumns = () => [
  {
    title: t("fields.name"),
    dataIndex: "firstName",
    key: "firstName",
    render: (_, { firstName, lastName }) => `${firstName} ${lastName}`,
  },
  { title: t("fields.email"), dataIndex: "email", key: "email" },
  { title: t("fields.role"), dataIndex: "role", key: "role" },
];
