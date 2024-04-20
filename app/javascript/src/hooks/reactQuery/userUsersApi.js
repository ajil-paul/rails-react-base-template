import { QUERY_KEYS } from "constants/queryKeys";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { usersApi } from "apis/users";

const buildFilters = filters => ({
  first_name_or_last_name_or_email_cont: filters.searchTerm,
});

export const useFetchUsers = ({ filters }) =>
  useQuery({
    queryKey: [QUERY_KEYS.USERS, { filters }],
    queryFn: () => usersApi.fetch(buildFilters(filters)),
    select: data => data?.users,
    placeholderData: keepPreviousData,
  });
