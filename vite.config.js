import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import RubyPlugin from "vite-plugin-ruby";

import resolve from "./resolve";

export default defineConfig({
  plugins: [RubyPlugin(), react()],
  resolve,
});
