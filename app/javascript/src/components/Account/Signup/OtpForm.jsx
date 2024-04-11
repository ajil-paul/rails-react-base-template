import routes from "constants/routes";

import React, { useEffect, useState } from "react";

import { Form } from "antd";
import { InputOTP } from "antd-input-otp";
import { useTranslation } from "react-i18next";
import { useResendOtp, useVerifyOtp } from "reactQuery/useAuthApi";

import AccountLayout from "../AccountLayout";

const OtpForm = ({ email }) => {
  const [countDown, setCountDown] = useState(30);
  const [attemptsLeft, setAttemptsLeft] = useState(5);

  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  const handleFinish = values => {
    attemptsLeft &&
      verifyOtp(
        { email, otp: values.otp.join("") },
        {
          onSuccess: () => (window.location.href = routes.home),
          onError: ({ response }) => {
            const {
              data: { error, attempts_left: attemptsLeft },
            } = response;
            const message = `${error} ${t("account.attemptsLeft", { count: attemptsLeft })}`;
            setAttemptsLeft(Number(attemptsLeft));
            form.setFields([{ name: "otp", errors: [message] }]);
          },
        }
      );
  };

  const handleResendOtp = () => {
    resendOtp(
      { email },
      {
        onSuccess: () => {
          setAttemptsLeft(5);
          form.resetFields();
          setCountDown(30);
        },
      }
    );
  };

  useEffect(() => {
    if (countDown !== 0) {
      const interval = setInterval(() => setCountDown(countDown - 1), 1000);

      return () => clearInterval(interval);
    }

    return () => {};
  }, [countDown]);

  return (
    <AccountLayout
      className="flex flex-col justify-center min-h-screen"
      title={t("account.otpVerification")}
    >
      <div className="max-w-4xl w-full mx-auto text-center">
        <p className="mb-10 mt-4 text-slate-500">{t("account.otpSend")}</p>
        <Form form={form} onFinish={handleFinish}>
          <Form.Item name="otp">
            <InputOTP
              autoSubmit={form}
              disabled={isVerifying}
              inputType="numeric"
              length={6}
              size="large"
            />
          </Form.Item>
        </Form>
        <div className="text-sm text-slate-500 mt-4">
          Didn't receive code?{" "}
          {countDown === 0 ? (
            <button
              className="font-medium text-indigo-500 hover:text-indigo-600"
              disabled={isResending}
              onClick={handleResendOtp}
            >
              Resend
            </button>
          ) : (
            <span className="font-medium text-sm text-indigo-500 hover:text-indigo-600">
              Resend OTP in {countDown}
            </span>
          )}
        </div>
      </div>
    </AccountLayout>
  );
};

export default OtpForm;
