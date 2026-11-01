import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router";

import ErrorBanner from "./assets/components/ErrorBanner";
import ErrorProvoker from "./assets/components/ErrorProvoker";
import { setupGlobalErrorHandlers } from "./globalErrorHandling";

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showRenderError, setShowRenderError] = useState(false);

  useEffect(() => {
    setupGlobalErrorHandlers(setErrorMessage); // Promise Rejections and TypeErrors etc. 

    return () => { // Reset global error handlers when the component unmounts
      window.onerror = null;
      window.onunhandledrejection = null;
    };
  }, []);

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
      
      {/* Outlet here is just the AppDemoContent component */}
      <Outlet context={{ showRenderError, setErrorMessage, setShowRenderError }} />
    </div>
  );
}

export default App;
