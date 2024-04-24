import React from "react";

import { Drawer } from "antd";
import { useTranslation } from "react-i18next";

import Form from "./Form";

const Filter = ({ isOpen, setIsOpen, formItems }) => {
  const { t } = useTranslation();

  const onClose = () => setIsOpen(false);

  return (
    <Drawer
      destroyOnClose
      open={isOpen}
      title={t("titles.filters")}
      onClose={() => setIsOpen(false)}
    >
      <Form {...{ isOpen, onClose, formItems }} />
    </Drawer>
  );
};

export default Filter;
