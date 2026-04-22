import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import DedoNavbar from "./components/nav/DedoNavbar.tsx";
import Bottombar from "./components/nav/Bottombar.tsx";
import { AudioSettingsProvider } from "./context/AudioSettingsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AudioSettingsProvider>
      <BrowserRouter>
        <DedoNavbar />
        <App />
        <Bottombar />
      </BrowserRouter>
    </AudioSettingsProvider>
  </React.StrictMode>
);
