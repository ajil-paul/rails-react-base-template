import { MAXIMUM_OFFLINE_DURATION } from "constants/axios";

import axios from "axios";
import { showErrorToast, showSuccessToast } from "utils/notifications";

const transformToCamelCase = data => {
  if (Array.isArray(data)) return data.map(transformToCamelCase);

  if (data !== null && typeof data === "object") {
    return Object.keys(data).reduce((acc, key) => {
      const newKey = key.replace(/_([a-z])/g, g => g[1].toUpperCase());

      return { ...acc, [newKey]: transformToCamelCase(data[key]) };
    }, {});
  }

  return data;
};

const transformToSnakeCase = data => {
  if (Array.isArray(data)) return data.map(transformToSnakeCase);

  if (data !== null && typeof data === "object") {
    return Object.keys(data).reduce((acc, key) => {
      const newKey = key.replace(/([A-Z])/g, g => `_${g.toLowerCase()}`);

      return { ...acc, [newKey]: transformToSnakeCase(data[key]) };
    }, {});
  }

  return data;
};

const handleSuccessResponse = response => {
  const { method, showToastr = true, transformCase = true } = response.config;
  if (["post", "put", "delete"].includes(method) && showToastr) {
    showSuccessToast(response.data?.message);
  }

  if (transformCase) response.data = transformToCamelCase(response.data);

  return response.data;
};

const handleRequest = request => {
  const { transformCase = true } = request;
  if (transformCase) request.data = transformToSnakeCase(request.data);

  return request;
};

const showErrorToastrMessage = error => {
  const { showToastr = true } = error.config ?? {};
  if (!showToastr) return error;

  if (error.message === "Network Error") return handleNetworkError(error);

  if (![403, 404].includes(error.response?.status) && !axios.isCancel(error)) {
    // we already display a page in case of 403 & 404 and we don't want to show a toastr for cancelled requests.
    showErrorToast(error.response?.data?.error || "Something went wrong");
  }

  return error;
};

const handle404ErrorResponse = error => {
  const { show404ErrorPage = true } = error.config ?? {};

  const status = error.response?.status;
  if (show404ErrorPage && [404, 403].includes(status)) {
    // const fullUrl = error.request?.responseURL || error.config.url;
    // useErrorDisplayStore.setState({
    //   showErrorPage: true,
    //   statusCode: status,
    //   failedApiUrl: fullUrl,
    // });
  }
};

const handleAuthErrorResponse = error => {
  const status = error.response?.status;

  if ([401, 403].includes(status)) {
    setTimeout(() => window.location.reload(), 2000);
  }

  return error;
};

const isUserOffline = () => !window.navigator.onLine;

const handleNetworkError = async error => {
  const errorMessage = "No internet connection";
  if (isUserOffline()) {
    await new Promise(resolve => setTimeout(resolve, MAXIMUM_OFFLINE_DURATION));
    if (isUserOffline()) showErrorToast(errorMessage);

    return error;
  }
  showErrorToast(errorMessage);

  return error;
};

const handleErrorResponse = error => {
  handleAuthErrorResponse(error);
  handle404ErrorResponse(error);
  showErrorToastrMessage(error);

  return Promise.reject(error);
};

const registerInterceptors = () => {
  axios.interceptors.response.use(handleSuccessResponse, handleErrorResponse);
  axios.interceptors.request.use(handleRequest);
};

export const initializeAxios = () => {
  axios.defaults.baseURL = "/api/v1/";
  axios.defaults.headers.common["X-CSRF-TOKEN"] = document.querySelector(
    "meta[name=csrf-token]"
  ).content;

  registerInterceptors();
};
