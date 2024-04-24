import { Input } from "antd";
import { t } from "i18next";

export const FILTER_ITEMS = [
  {
    label: t("fields.nameOrEmail"),
    name: "search_term",
    Component: Input,
    props: {
      placeholder: t("placeholders.search", {
        what: t("fields.nameOrEmail").toLocaleLowerCase(),
      }),
    },
  },
];
