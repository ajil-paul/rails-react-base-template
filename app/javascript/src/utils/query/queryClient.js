import { QueryCache, QueryClient } from "@tanstack/react-query";

import { showErrorToast } from "utils/notifications";

const isUserOffline = () => !window.navigator.onLine;

const handleError = async error => {
  const errorMessage = "No internet connection";
  if (error.message === "Network Error" && isUserOffline()) {
    return showErrorToast(errorMessage);
  }

  const { showToastr = true, show404ErrorPage = true } = error.config ?? {};
  if (!showToastr || !show404ErrorPage) return error;

  return showErrorToast(error.response?.data?.error || "Something went wrong");
};

const handleRetry = (retryCount, error) => {
  if (error.message === "Network Error" && isUserOffline()) {
    return retryCount < 2;
  }

  const isUnauthorized = [404, 403].includes(error.response?.status);
  if (isUnauthorized || retryCount >= 1) return false;

  return true;
};

const handleRetryDelay = (retryCount, error) => {
  if (error.message === "Network Error" && isUserOffline()) {
    return 2000 * (retryCount + 1);
  }

  return 2000;
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleError }),
  defaultOptions: {
    queries: {
      retry: handleRetry,
      retryDelay: handleRetryDelay,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export { queryClient };
