import { t } from "i18next";

export const buildColumns = () => [
  { title: t("fields.firstName"), dataIndex: "firstName" },
  { title: t("fields.lastName"), dataIndex: "lastName" },
  { title: t("fields.email"), dataIndex: "email" },
  { title: t("fields.role"), dataIndex: "role" },
];
