import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { LoCProvider } from "./components/contexts/LoCContext";
import { LoCPerSecondProvider } from "./components/contexts/LoCPerSecondContext";
import { UpgradesProvider } from "./components/contexts/UpgradesContext";
import { LoCOnClickProvider } from "./components/contexts/LoCOnClickContext";
import { BuildingsProvider } from "./components/contexts/BuildingsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoCProvider>
      <LoCOnClickProvider>
        <LoCPerSecondProvider>
          <UpgradesProvider>
            <BuildingsProvider>
              <App />
            </BuildingsProvider>
          </UpgradesProvider>
        </LoCPerSecondProvider>
      </LoCOnClickProvider>
    </LoCProvider>
  </React.StrictMode>
);

reportWebVitals();