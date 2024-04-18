import { t } from "i18next";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

export const SIGNUP_FORM_RULES = {
  email: [
    {
      required: true,
      message: t("validations.required", { what: t("fields.email") }),
    },
  ],
  password: [
    {
      required: true,
      message: t("validations.required", { what: t("account.password") }),
    },
    { min: 6, message: t("validations.minPassword") },
    {
      pattern: PASSWORD_REGEX,
      message: t("validations.passwordPattern"),
    },
  ],
  passwordConfirmation: [
    {
      required: true,
      message: t("validations.required", {
        what: t("account.confirmPassword"),
      }),
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }

        return Promise.reject(t("validations.passwordNotMatch"));
      },
    }),
  ],
};

export const LOGIN_FORM_RULES = {
  email: [
    { required: true, message: "" },
    {
      type: "email",
      message: t("validations.invalid", { what: t("fields.email") }),
    },
  ],
  password: [{ required: true, message: "" }],
};

export const PROFILE_FORM_RULES = {
  firstName: [
    {
      required: true,
      message: t("validations.required", { what: t("fields.firstName") }),
    },
  ],
  lastName: [
    {
      required: true,
      message: t("validations.required", { what: t("fields.lastName") }),
    },
  ],
  language: [
    {
      required: true,
      message: t("validations.required", { what: t("account.language") }),
    },
  ],
};
