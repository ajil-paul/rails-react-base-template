import { Input } from "antd";
import { t } from "i18next";

import Select from "components/Common/Select";
import { useFetchRoles } from "reactQuery/useRolesApi";

export const useFilterForm = () => {
  const { data: roles = [], isLoading: isFetchingRoles } = useFetchRoles();

  return [
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
    {
      label: t("fields.role"),
      name: "role",
      Component: Select,
      props: {
        placeholder: t("placeholders.select", {
          what: t("fields.role").toLocaleLowerCase(),
        }),
        options: roles,
        loading: isFetchingRoles,
        fieldNames: { label: "name", value: "name" },
        allowClear: true,
        showSearch: true,
      },
    },
  ];
};
