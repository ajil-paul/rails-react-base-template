import { useMutation } from "@tanstack/react-query";
import { authApi } from "apis/auth";

export const useCreateUser = () => useMutation({ mutationFn: authApi.signUp });

export const useVerifyOtp = () =>
  useMutation({ mutationFn: authApi.verifyOtp });

export const useResendOtp = () =>
  useMutation({ mutationFn: authApi.resendOtp });

export const useLogin = () => useMutation({ mutationFn: authApi.login });

export const useUpdateUser = () => useMutation({ mutationFn: authApi.update });
