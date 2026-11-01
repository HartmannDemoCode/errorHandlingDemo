import { useEffect, useState } from "react";
import "./App.css";
import { Outlet, useLocation, useNavigate } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./assets/components/ErrorFallBack";
import RenderErrorDemo from "./assets/components/RenderErrorDemo";

import ErrorBanner from "./assets/components/ErrorBanner";
import ErrorProvoker from "./assets/components/ErrorProvoker";
import ErrorPage from "./assets/components/ErrorPage";
import { setupGlobalErrorHandlers } from "./globalErrorHandling";


function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showRenderError, setShowRenderError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const invalidRoute = !["/", "/articles"].includes(location.pathname);

  useEffect(() => {
    setupGlobalErrorHandlers(setErrorMessage); // Promise Rejections and TypeErrors etc. 

    return () => { // Reset global error handlers when the component unmounts
      window.onerror = null;
      window.onunhandledrejection = null;
    };
  }, []);

  const handleResetFromRouteError = () => {
    setShowRenderError(false);
    setErrorMessage(null);
    navigate("/");
  };

  return (
    <div>
      <ErrorBanner
        errorMessage={errorMessage}
        onClear={() => {
          setErrorMessage(null);
          setShowRenderError(false);
        }}
      />
      <ErrorProvoker 
        setErrorMessage={setErrorMessage}
        setShowRenderError={setShowRenderError}
      />

      {invalidRoute ? (
        <ErrorPage onReset={handleResetFromRouteError} />
      ) : (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            setErrorMessage(null);
            setShowRenderError(false);
          }}
        >
          <RenderErrorDemo showRenderError={showRenderError} />
        </ErrorBoundary>
      )}
    </div>
  );
}

export default App;
