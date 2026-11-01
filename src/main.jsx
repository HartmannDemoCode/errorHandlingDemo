import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/articles" element={<App />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
