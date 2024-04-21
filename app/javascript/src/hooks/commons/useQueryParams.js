import { useLocation } from "react-router-dom";

import { parseQueryParams } from "utils/general";

const useQueryParams = options => {
  const location = useLocation();

  return parseQueryParams(location.search, options);
};

export default useQueryParams;
