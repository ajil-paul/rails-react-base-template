export const INITIAL_PROFILE_VALUES = {
  firstName: window.userDetails?.first_name || "",
  lastName: window.userDetails?.last_name || "",
  email: window.userDetails?.email || "",
  country: window.userDetails?.country || "",
  phoneNumber: "",
  timeZone: "",
  language: "",
};

export const INITIAL_LOGIN_FORM = {
  email: "",
  password: "",
  rememberMe: false,
};

export const INITIAL_SIGNUP_FORM = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

export const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "Malayalam", value: "ml" },
];
