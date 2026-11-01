import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import AppDemoContent from "./pages/AppDemoContent";
import MissingRoutePage from "./pages/MissingRoutePage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<AppDemoContent />} />
          <Route path="articles" element={<AppDemoContent />} />
          <Route path="*" element={<MissingRoutePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
