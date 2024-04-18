import { QUERY_KEYS } from "constants/queryKeys";

import { useQuery } from "@tanstack/react-query";
import { usersApi } from "apis/users";

export const useFetchUsers = () =>
  useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: usersApi.fetch,
    select: data => data?.users,
  });
