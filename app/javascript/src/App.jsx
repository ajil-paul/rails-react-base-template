import React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import Routes from "components/Routes";
import { queryClient } from "utils/query/queryClient";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Routes />
  </QueryClientProvider>
);

export default App;
