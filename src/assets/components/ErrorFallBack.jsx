export default function ErrorFallback({ error, resetErrorBoundary }) {
    // the 2 props are provided by the ErrorBoundary component from react-error-boundary. Any button or link can be used to reset the error boundary and re-render the component tree by calling the resetErrorBoundary function. The error prop contains the error that was thrown in the component tree.
  return (
    <div role="alert" style={{ backgroundColor: "#fee2e2", color: "#7f1d1d", padding: "1rem", margin: "1rem 0" }}>
      <h2>Something went wrong.</h2>
      <p>{error.message}</p>
      <button type="button" onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
