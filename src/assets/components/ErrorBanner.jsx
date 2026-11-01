function ErrorBanner({ errorMessage, onClear }) {
  return (
    errorMessage && (
      <div style={{ backgroundColor: "red", color: "white", padding: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <div>
          <strong>Error:</strong> {errorMessage}
        </div>
        {onClear && (
          <button type="button" onClick={onClear} style={{ padding: "0.35rem 0.7rem", cursor: "pointer" }}>
            Reset
          </button>
        )}
      </div>
    )
  );
}

export default ErrorBanner;