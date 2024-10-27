import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer position="top-center" autoClose={2000} />{" "}
    {/* Toast container to use popup notification when register to the newsletter(the notification last 2sec)*/}
    <App />
  </React.StrictMode>
);
