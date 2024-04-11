/* eslint-disable */
import React from "react";

import { createRoot } from "react-dom/client";

import "./commons/i18n";

import App from "./App";
import "./index.css";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
