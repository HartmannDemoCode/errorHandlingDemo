import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router";
import { ErrorBoundary } from "react-error-boundary";

import ErrorBanner from "./ErrorBanner";
import ErrorProvoker from "./ErrorProvoker";
import { setupGlobalErrorHandlers } from "./globalErrorHandling";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ backgroundColor: "#fee2e2", color: "#7f1d1d", padding: "1rem", margin: "1rem 0" }}>
      <h2>Something went wrong.</h2>
      <p>{error.message}</p>
      <button type="button" onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showRenderError, setShowRenderError] = useState(false);

  useEffect(() => {
    setupGlobalErrorHandlers(setErrorMessage);

    return () => {
      window.onerror = null;
      window.onunhandledrejection = null;
    };
  }, []);

  return (
    <div>
      <ErrorBanner errorMessage={errorMessage} />
      <ErrorProvoker setErrorMessage={setErrorMessage} setShowRenderError={setShowRenderError} />

      <ErrorBoundary 
      FallbackComponent={ErrorFallback}
        onReset={() => {
          setErrorMessage(null);
          setShowRenderError(false);
        }}
      >
        <Outlet context={{ showRenderError }} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
