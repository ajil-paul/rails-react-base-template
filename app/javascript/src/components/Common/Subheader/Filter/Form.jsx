import React, { useEffect } from "react";

import { Button, Form as AntdForm } from "antd";
import { complement, compose, isEmpty, isNil, mergeLeft, pickBy } from "ramda";
import { useNavigate } from "react-router-dom";

import useQueryParams from "hooks/commons/useQueryParams";
import { buildUrl } from "utils/react/general";

const Form = ({ onClose, formItems = [] }) => {
  const navigate = useNavigate();
  const queryParams = useQueryParams({ toCamelCase: false });
  const [form] = AntdForm.useForm();

  const pathname = window.location.pathname;

  const removeEmptyOrNullProps = compose(
    pickBy(complement(isNil)),
    pickBy(complement(isEmpty))
  );

  const handleFinish = values => {
    const newParams = mergeLeft(values, queryParams);

    navigate(buildUrl(pathname, removeEmptyOrNullProps(newParams)));
    onClose();
  };

  const handleClear = () => {
    form.resetFields();
    navigate(pathname);
    onClose();
  };

  useEffect(() => {
    form.setFieldsValue(queryParams);
  }, [queryParams]);

  return (
    <AntdForm
      className="relative flex flex-col h-full overflow-y-auto"
      form={form}
      initialValues={{}}
      layout="vertical"
      onFinish={handleFinish}
    >
      {formItems.map(({ label, name, Component, props }) => (
        <AntdForm.Item key={name} label={label} name={name}>
          <Component {...props} />
        </AntdForm.Item>
      ))}
      <div className="sticky bottom-0 flex mt-auto gap-x-2">
        <Button htmlType="submit" type="primary">
          Apply filter
        </Button>
        <Button onClick={handleClear}>Clear</Button>
      </div>
    </AntdForm>
  );
};

export default Form;
