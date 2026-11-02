import { Link, useOutletContext } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../assets/components/ErrorFallBack";
import RenderErrorDemo from "../assets/components/RenderErrorDemo";

export default function AppDemoContent() {
  const { showRenderError, setShowRenderError, setErrorMessage } = useOutletContext();

  return (
    <>
      <div>
        <Link to="/auth-demo" className="auth-demo-link">
          Go to Auth Demo
        </Link>
      </div>

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          setShowRenderError(false);
          setErrorMessage(null);
        }}
      >
        {/* This component can throw an error during rendering! */}
        <RenderErrorDemo showRenderError={showRenderError} />
      </ErrorBoundary>
    </>
  );
}
