import { t } from "i18next";

export const buildColumns = () => [
  { title: t("fields.name"), dataIndex: "name", key: "name" },
  { title: t("fields.email"), dataIndex: "email", key: "email" },
  { title: t("fields.role"), dataIndex: "role", key: "role" },
];
