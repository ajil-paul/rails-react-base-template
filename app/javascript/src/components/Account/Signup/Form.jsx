import React from "react";

import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import routes from "constants/routes";

import AccountLayout from "../AccountLayout";
import { INITIAL_SIGNUP_FORM } from "../constants";
import OauthLogin from "../OauthLogin";
import { SIGNUP_FORM_RULES } from "../validations";

const SignupForm = ({ onFinish }) => {
  const { t } = useTranslation();

  return (
    <AccountLayout title="Create an account">
      <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="px-6 py-12 bg-white shadow sm:rounded-lg sm:px-12">
          <Form
            autoComplete="true"
            initialValues={INITIAL_SIGNUP_FORM}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label={t("account.emailAddress")}
              name="email"
              rules={SIGNUP_FORM_RULES.email}
            >
              <Input id="email" name="email" type="email" />
            </Form.Item>
            <Form.Item
              validateFirst
              label={t("account.password")}
              name="password"
              rules={SIGNUP_FORM_RULES.password}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              validateFirst
              label={t("account.confirmPassword")}
              name="passwordConfirmation"
              rules={SIGNUP_FORM_RULES.passwordConfirmation}
            >
              <Input type="password" />
            </Form.Item>
            <Button
              className="w-full"
              htmlType="submit"
              size="large"
              type="primary"
            >
              {t("account.signUp")}
            </Button>
          </Form>
          <OauthLogin />
        </div>
        <p className="mt-10 text-sm text-center text-gray-500">
          {t("account.alreadyHaveAccount")}{" "}
          <Link
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            to={routes.login}
          >
            {t("account.loginToYourAccount")}
          </Link>
        </p>
      </div>
    </AccountLayout>
  );
};

export default SignupForm;
