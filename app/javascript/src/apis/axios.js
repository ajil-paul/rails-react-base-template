import axios from "axios";
import qs from "qs";

import { showSuccessToast } from "utils/notifications";

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

const registerInterceptors = () => {
  axios.interceptors.response.use(handleSuccessResponse);
  axios.interceptors.request.use(handleRequest);
};

export const initializeAxios = () => {
  axios.defaults.baseURL = "/api/v1/";
  axios.defaults.headers.common["X-CSRF-TOKEN"] = document.querySelector(
    "meta[name=csrf-token]"
  ).content;

  axios.defaults.paramsSerializer = params =>
    qs.stringify(params, { arrayFormat: "brackets" });

  registerInterceptors();
};
