import { defineConfig } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import react from "@vitejs/plugin-react";

import resolve from "./resolve";

export default defineConfig({
  plugins: [RubyPlugin(), react()],
  resolve,
});
