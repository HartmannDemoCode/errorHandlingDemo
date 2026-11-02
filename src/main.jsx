import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import AppDemoContent from "./pages/AppDemoContent";
import AuthDemoPage from "./pages/AuthDemoPage";
import MissingRoutePage from "./pages/MissingRoutePage";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <ErrorBoundary FalbackComponent={ErrorFallback} onReset={() => {}} > */}
    {/* ErrorBoundary in this place will protect against errors in the routing system. So it is a ggod place to put it, just not for this demo where it is put in AppDemoContent instead */}
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<AppDemoContent />} />
          <Route path="articles" element={<AppDemoContent />} />
          <Route path="auth-demo" element={<AuthDemoPage />} />
          <Route path="*" element={<MissingRoutePage />} />
        </Route>
      </Routes>
    {/* </ErrorBoundary> */}
    </BrowserRouter>
  </React.StrictMode>,
);
