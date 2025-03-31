import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { LoCProvider } from "./components/contexts/LoCContext";
import { LoCPerSecondProvider } from "./components/contexts/LoCPerSecondContext";
import { UpgradesProvider } from "./components/contexts/UpgradesContext";
import { LoCOnClickProvider } from "./components/contexts/LoCOnClickContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoCProvider>
      <LoCOnClickProvider>
        <LoCPerSecondProvider>
          <UpgradesProvider>
            <App />
          </UpgradesProvider>
        </LoCPerSecondProvider>
      </LoCOnClickProvider>
    </LoCProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
