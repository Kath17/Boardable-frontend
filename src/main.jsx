/* eslint-disable no-unused-vars, no-console */
import * as React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App/App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render([
  // <React.StrictMode>
  <RouterProvider router={router} />,
  // </React.StrictMode>,
]);
