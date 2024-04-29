import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { usersApi } from "apis/users";
import { QUERY_KEYS } from "constants/queryKeys";

const buildFilters = filters => ({
  full_name_or_email_cont: filters.searchTerm,
  role_name_eq: filters.role,
});

export const useFetchUsers = ({ filters }) =>
  useQuery({
    queryKey: [QUERY_KEYS.USERS, { filters }],
    queryFn: () => usersApi.fetch(buildFilters(filters)),
    select: data => data?.users,
    placeholderData: keepPreviousData,
  });
