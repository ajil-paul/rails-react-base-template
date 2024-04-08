import React from "react";

import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="text-xl font-semibold text-blue-800 ">{t("welcome")}</div>
  );
};

export default Home;
