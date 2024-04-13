import axios from "axios";

const signUp = user => axios.post("users", { user });

const update = user => axios.put("users", { user });

const verifyOtp = user => axios.post("users/validate_otp", { user });

const resendOtp = user => axios.post("users/resend_otp", { user });

const login = user => axios.post("session", { user });

const logout = () => axios.delete("session");

const authApi = { signUp, verifyOtp, resendOtp, login, update, logout };

export { authApi };
