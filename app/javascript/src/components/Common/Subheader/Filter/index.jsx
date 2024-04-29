import React from "react";

import { Drawer } from "antd";
import { useTranslation } from "react-i18next";

import Form from "./Form";

const Filter = ({ isOpen, setIsOpen, useFilterForm = () => [] }) => {
  const { t } = useTranslation();

  const onClose = () => setIsOpen(false);

  return (
    <Drawer
      destroyOnClose
      open={isOpen}
      title={t("titles.filters")}
      onClose={() => setIsOpen(false)}
    >
      <Form {...{ isOpen, onClose, useFilterForm }} />
    </Drawer>
  );
};

export default Filter;
