import React from "react";

import { Button } from "antd";
import { useTranslation } from "react-i18next";

import { useLogout } from "reactQuery/useAuthApi";

const Home = () => {
  const { t } = useTranslation();

  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  return (
    <div className="text-xl font-semibold text-blue-800 ">
      {t("welcome")}
      <Button loading={isLoggingOut} onClick={logout}>
        {t("logout")}
      </Button>
    </div>
  );
};

export default Home;
