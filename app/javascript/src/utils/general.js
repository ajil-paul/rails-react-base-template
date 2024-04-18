import i18next from "i18next";
import { camelToSnakeCase, getRandomInt, transformObjectDeep } from "neetocist";
import { parse, stringify } from "qs";
import { identity, curry, isEmpty, omit, pipe, toPairs } from "ramda";

const toCamelCasedString = string =>
  string.replace(/[_-]+(\w)/g, (_, nextChar) => nextChar.toUpperCase());

export const withEventTargetValue = /*#__PURE__*/ curry((func, event) =>
  func(event.target.value)
);

export const getSubdomain = () => {
  const host = window.location.host;
  const parts = host.split(".");

  return parts.length >= 3 ? parts[0] : "";
};

export const simulateApiCall = (
  result,
  error,
  errorProbability = 0.1,
  delay = getRandomInt(350, 1000)
) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      const defaultErrorObj = {
        success: false,
        notice: i18next.t("neetoCommons.notice.errorOccurred"),
      };

      Math.random() < errorProbability
        ? reject({ ...defaultErrorObj, ...error })
        : resolve(result);
    }, delay)
  );

export const copyToClipboard = async (
  text
  //   {
  //     showToastr = true,
  //     message = i18next.t("neetoCommons.toastr.success.copiedToClipboard"),
  //   } = {}
) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;

      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    // showToastr && Toastr.success(message);
  } catch (error) {
    console.log(error); // eslint-disable-line
    // Toastr.error(error);
  }
};

export const buildUrl = (route, params, options = {}) => {
  const placeHolders = [];
  const { toSnakeCase = true } = options;
  toPairs(params).forEach(([key, value]) => {
    if (!route.includes(`:${key}`)) return;
    placeHolders.push(key);
    route = route.replace(`:${key}`, encodeURIComponent(value));
  });

  const keyTransformer = toSnakeCase ? camelToSnakeCase : identity;
  const transformObjectKeys = params =>
    transformObjectDeep(
      params,
      (key, value) => [keyTransformer(key), value],
      object =>
        typeof object?.toJSON === "function" ? object.toJSON() : object
    );

  const queryParams = pipe(
    omit(placeHolders),
    transformObjectKeys,
    stringify
  )(params);

  return isEmpty(queryParams) ? route : `${route}?${queryParams}`;
};

export const toLocale = (number, options = undefined) =>
  Number(number).toLocaleString(
    window.globalProps?.user?.locale ||
      navigator.language ||
      navigator.languages[0],
    options
  );

export const parseQueryParams = (search, options = {}) => {
  const { toCamelCase = true, ...qsOptions } = options;
  let params = parse(search, {
    ignoreQueryPrefix: true,
    ...qsOptions,
  });

  if (toCamelCase) {
    const pairedParams = toPairs(params);
    params = {};
    pairedParams.forEach(([key, value]) => {
      const camelCasedKey = toCamelCasedString(key);
      params[camelCasedKey] = value;
    });
  }

  return params;
};

export const getQueryParams = options =>
  parseQueryParams(location.search, options);

export const joinHyphenCase = (...args) =>
  args.join(" ").replace(/\s+/g, "-").toLowerCase();

export const hyphenize = (value, fallbackString = "") => {
  if (typeof value === "number") return String(value);

  if (value && typeof value === "string" && value.replace) {
    return value
      .replace(/[\s_]/g, "-")
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/-+/g, "-")
      .toLowerCase();
  }

  return fallbackString;
};

export const debounce = (func, delay = 350) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

export const getFromLocalStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

export const setToLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const removeFromLocalStorage = key => localStorage.removeItem(key);

// export const showThumbsUpToastr = () =>
//   Toastr.success("", { icon: "👍", className: "w-20" });
