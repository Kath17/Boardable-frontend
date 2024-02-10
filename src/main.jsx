/* eslint-disable no-unused-vars, no-console */
import * as React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { AuthProvider } from "./contexts/authContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")).render([
  // eslint-disable-next-line react/jsx-key
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
]);
