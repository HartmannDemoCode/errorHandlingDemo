import { useLocation } from "react-router";

export default function ErrorPage({ onReset }) {
  const location = useLocation();

  return (
    <div
      id="error-page"
      style={{
        marginTop: "1rem",
        padding: "1rem 1.25rem",
        border: "1px solid #fca5a5",
        borderRadius: "8px",
        backgroundColor: "#fff1f2",
        color: "#4c0519",
        textAlign: "left",
        boxShadow: "0 2px 8px rgba(127, 29, 29, 0.08)",
      }}
    >
      <h1 style={{ marginTop: 0, marginBottom: "0.5rem", color: "#7f1d1d" }}>Route error</h1>
      <p style={{ margin: "0.25rem 0" }}>This simulates a bad or missing route.</p>
      <p style={{ margin: "0.25rem 0" }}>
        <i>Requested path: {location.pathname}</i>
      </p>
      <button
        type="button"
        onClick={onReset}
        style={{
          marginTop: "0.75rem",
          padding: "0.5rem 0.9rem",
          border: "1px solid #be123c",
          borderRadius: "6px",
          backgroundColor: "#fecdd3",
          color: "#4c0519",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Return to app
      </button>
    </div>
  );
}