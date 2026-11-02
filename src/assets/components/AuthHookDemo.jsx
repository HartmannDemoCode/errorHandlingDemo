import { useEffect } from "react";

export default function AuthHookDemo({ auth }) {
  if (!auth) {
    return (
      <div className="auth-demo-card auth-demo-card--missing">
        <h3>Auth Hook Demo</h3>
        <p>Auth state is not available.</p>
      </div>
    );
  }

  const {
    user,
    signIn,
    signOut,
    fetchProtectedData,
    protectedData,
    error,
    loading,
    isAuthenticated,
  } = auth;

  useEffect(() => {
    if (isAuthenticated && !protectedData) {
      fetchProtectedData();
    }
  }, [isAuthenticated, protectedData, fetchProtectedData]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());

    await signIn(formObject.username, formObject.password);
  };

  return (
    <div className="auth-demo-card">
      <h3>Auth Hook Demo</h3>
      <p>This hook wraps the app's API login/logout flow and handles auth errors in one place.</p>

      {isAuthenticated ? (
        <div>
          <p>You are logged in as {user?.username}.</p>
          <button type="button" onClick={signOut} className="auth-demo-button-secondary">Log out</button>

          {loading ? (
            <p className="auth-demo-status">Loading protected content...</p>
          ) : protectedData ? (
            <div className="auth-demo-results">
              <strong>Protected endpoint response:</strong>
              <pre>{JSON.stringify(protectedData, null, 2)}</pre>
            </div>
          ) : (
            <p>No protected data available.</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleLogin} className="auth-demo-form">
          <input name="username" placeholder="Username" defaultValue="user" />
          <input name="password" type="password" placeholder="Password" defaultValue="pass123" />
          <button type="submit" disabled={loading} className="auth-demo-button">
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      )}

      {error && <p className="auth-demo-error">{error}</p>}
    </div>
  );
}
