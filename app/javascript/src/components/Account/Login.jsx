import React, { useState } from "react";

import { Button, Input, Form, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";

import routes from "constants/routes";
import { useLogin } from "reactQuery/useAuthApi";

import AccountLayout from "./AccountLayout";
import { INITIAL_LOGIN_FORM } from "./constants";
import OauthLogin from "./OauthLogin";
import { LOGIN_FORM_RULES } from "./validations";

const Login = () => {
  const [error, setError] = useState(null);

  const { t } = useTranslation();
  const { mutate: login, isPending: isSigningIn } = useLogin();

  const { userDetails = {} } = window;

  if (userDetails?.email) return <Navigate replace to={routes.home} />;

  const handleFinish = values =>
    login(values, {
      onSuccess: () => (window.location.href = routes.home),
      onError: ({ response }) => setError(response?.data?.error),
    });

  return (
    <AccountLayout title={t("account.signInTitle")}>
      <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="px-6 py-12 bg-white shadow sm:rounded-lg sm:px-12">
          <Form
            autoComplete="true"
            className="space-y-6"
            initialValues={INITIAL_LOGIN_FORM}
            layout="vertical"
            onFinish={handleFinish}
          >
            <Form.Item
              label={t("account.emailAddress")}
              name="email"
              rules={LOGIN_FORM_RULES.email}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("account.password")}
              name="password"
              rules={LOGIN_FORM_RULES.password}
            >
              <Input type="password" />
            </Form.Item>
            <div className="flex items-center justify-between">
              <Form.Item name="remember">
                <Checkbox>{t("account.rememberMe")}</Checkbox>
              </Form.Item>
              <a
                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                href="#"
              >
                {t("account.forgotPassword")}
              </a>
            </div>
            {error && (
              <div className="p-2 text-center text-red-600 rounded-md bg-red-50">
                {error}
              </div>
            )}
            <Button
              className="w-full"
              htmlType="submit"
              loading={isSigningIn}
              size="large"
              type="primary"
            >
              {t("account.signIn")}
            </Button>
          </Form>
          <OauthLogin />
        </div>
        <p className="mt-10 text-sm text-center text-gray-500">
          {t("account.dontHaveAccount")}{" "}
          <Link
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            to={routes.signUp}
          >
            {t("account.createAccount")}
          </Link>
        </p>
      </div>
    </AccountLayout>
  );
};

export default Login;
