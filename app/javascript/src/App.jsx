import React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import Routes from "components/Routes";
import { queryClient } from "utils/query/queryClient";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      wave={{ disabled: true }}
      theme={{
        token: {
          colorPrimary: "#5046e5",
          fontFamily: "DM Sans",
        },
        components: { Checkbox: { colorPrimary: "#5046e5" } },
      }}
    >
      <Routes />
    </ConfigProvider>
  </QueryClientProvider>
);

export default App;
