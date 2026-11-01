export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ backgroundColor: "#fee2e2", color: "#7f1d1d", padding: "1rem", margin: "1rem 0" }}>
      <h2>Something went wrong.</h2>
      <p>{error.message}</p>
      <button type="button" onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
