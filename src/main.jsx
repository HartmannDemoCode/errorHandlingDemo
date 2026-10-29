import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import Content from "./Content";
import ErrorPage from "./ErrorPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Content />} />
          <Route path="articles" element={<Content />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
