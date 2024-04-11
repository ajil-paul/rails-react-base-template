import React, { useState } from "react";

import { useCreateUser } from "reactQuery/useAuthApi";

import SignupForm from "./Form";
import OtpForm from "./OtpForm";

const Signup = () => {
  const [verifyOtpFor, setVerifyOtpFor] = useState(null);

  const { mutate: createUser, isPending } = useCreateUser();

  const onFinish = values =>
    createUser(values, { onSuccess: () => setVerifyOtpFor(values.email) });

  return verifyOtpFor ? (
    <OtpForm email={verifyOtpFor} />
  ) : (
    <SignupForm isPending={isPending} onFinish={onFinish} />
  );
};

export default Signup;
