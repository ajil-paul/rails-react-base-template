import { message } from "antd";

export const showSuccessToast = msg => message.success(msg, 2);

export const showErrorToast = msg => message.error(msg, 2);
