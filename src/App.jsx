import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router";

import ErrorBanner from "./assets/components/ErrorBanner";
import ErrorProvoker from "./assets/components/ErrorProvoker";
import { setupGlobalErrorHandlers } from "./globalErrorHandling";
import Header from "./assets/components/Header";
import { useAuth } from "./hooks/useAuth";
// import { RenderErrorDemo, JSErrorDemo } from "./assets/components/SmallDemos";


function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showRenderError, setShowRenderError] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    setupGlobalErrorHandlers(setErrorMessage); // Promise Rejections and TypeErrors etc. 

    return () => { // Reset global error handlers when the component unmounts
      window.onerror = null;
      window.onunhandledrejection = null;
    };
  }, []);

  return (
    <>
      <Header user={auth.user} />
      {/* <RenderErrorDemo  explain="This is to show a react render error undhandled by the error boundary and not caught by the global error handlers, since react handles render errors first before they can be caught by global error handlers."/> */}
      {/* <JSErrorDemo explain="This is to show a JavaScript error that will be caught by the global error handlers." /> */}
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
      <Outlet context={{ auth, showRenderError, setErrorMessage, setShowRenderError }} />
    </>
  );
}

export default App;
