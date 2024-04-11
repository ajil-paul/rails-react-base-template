import routes from "constants/routes";

import React, { useState } from "react";

import { Input, Form, Button, Select } from "antd";
import PhoneInput from "antd-phone-input";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { useUpdateUser } from "reactQuery/useAuthApi";

import AccountLayout from "./AccountLayout";
import { LANGUAGES } from "./constants";
import { PROFILE_FORM_RULES } from "./validations";

const SetupProfile = () => {
  const [isSubmittedOnce, setIsSubmittedOnce] = useState(false);

  const { t } = useTranslation();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const { userDetails = {} } = window;
  const { isProfileCompleted } = userDetails;

  if (!userDetails?.email) return <Navigate replace to={routes.login} />;

  if (isProfileCompleted) return <Navigate replace to={routes.home} />;

  const initialValues = {
    firstName: userDetails?.firstName || "",
    lastName: userDetails?.lastName || "",
    phoneNumber: "",
    language: "en",
  };

  const validator = (_, { valid }) => {
    if (valid()) return Promise.resolve();

    return Promise.reject(
      t("validations.invalid", { what: t("account.phoneNumber") })
    );
  };

  const handleFinish = values =>
    updateUser(values, { onSuccess: () => (window.location.href = "/") });

  return (
    <AccountLayout title="Setup Profile">
      <div className="w-full max-w-2xl px-6 py-12 mx-auto bg-white shadow sm:rounded-lg sm:px-12">
        <Form
          className="w-full"
          initialValues={initialValues}
          layout="vertical"
          validateTrigger={isSubmittedOnce ? "onChange" : "onSubmit"}
          onFinish={handleFinish}
          onSubmitCapture={() => setIsSubmittedOnce(true)}
        >
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
            <Form.Item
              className="sm:col-span-3"
              label={t("account.firstName")}
              name="firstName"
              rules={PROFILE_FORM_RULES.firstName}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="sm:col-span-3"
              label={t("account.lastName")}
              name="lastName"
              rules={PROFILE_FORM_RULES.lastName}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="rounded sm:col-span-3"
              label={t("account.language")}
              name="language"
              rules={PROFILE_FORM_RULES.language}
            >
              <Select showSearch optionFilterProp="label" options={LANGUAGES} />
            </Form.Item>
            <Form.Item
              className="sm:col-span-3"
              label={t("account.phoneNumber")}
              name="phone"
              rules={[{ validator }]}
            >
              <PhoneInput enableSearch />
            </Form.Item>
          </div>
          <Button
            className="w-full mt-6"
            htmlType="submit"
            loading={isUpdating}
            size="large"
            type="primary"
          >
            {t("commons.complete")}
          </Button>
        </Form>
      </div>
    </AccountLayout>
  );
};

export default SetupProfile;
