import { resolve } from "path";

const root = resolve(__dirname, "app/javascript/src");

export default {
  alias: {
    components: resolve(root, "components"),
    constants: resolve(root, "constants"),
    hooks: resolve(root, "hooks"),
    utils: resolve(root, "utils"),
    apis: resolve(root, "apis"),
    reactQuery: resolve(root, "hooks/reactQuery"),

    neetocist: "@bigbinary/neeto-cist",
  },
};
