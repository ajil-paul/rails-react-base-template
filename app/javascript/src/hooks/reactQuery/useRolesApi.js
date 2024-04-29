import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { rolesApi } from "apis/role";
import { QUERY_KEYS } from "constants/queryKeys";

export const useFetchRoles = () =>
  useQuery({
    queryFn: rolesApi.fetch,
    queryKey: [QUERY_KEYS.ROLES],
    select: data => data?.roles,
    placeholderData: keepPreviousData,
  });
