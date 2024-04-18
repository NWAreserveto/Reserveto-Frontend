import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./Styles/CreateAcc.scss";
import "./Styles/Login.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./Styles/ForgetPassword.scss";
import "./Styles/NewPassword.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
