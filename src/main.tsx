import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import DedoNavbar from "./components/nav/DedoNavbar.tsx";
import Bottombar from "./components/nav/Bottombar.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DedoNavbar />
      <App />
      <Bottombar />
    </BrowserRouter>
  </React.StrictMode>
);
