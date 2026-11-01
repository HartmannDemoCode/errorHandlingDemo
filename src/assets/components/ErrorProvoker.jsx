import { Link } from "react-router";

const ErrorProvoker = ({ setErrorMessage, setShowRenderError }) => {
  
  const handleThrowError = () => {
    try {
      throw new Error("An error occurred in the event handler!");
    } catch (error) {
      console.error("Caught in event handler:", error);
      setErrorMessage(error.message);
    }
  };

  const handleAsyncError = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/404");
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }
      await response.json();
    } catch (error) {
      console.error("Caught async error:", error);
      setErrorMessage(error.message);
    }
  };

  const handleRenderError = () => {
    console.error("Triggering React render error...");
    setShowRenderError(true);
  };

  const handleFormValidationError = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.trim() || "";

    if (!email || !email.includes("@")) {
      setErrorMessage("Form validation failed: please enter a valid email address.");
      return;
    }

    setErrorMessage(null);
    alert("Form submitted successfully!");
  };

  return (
    <>
      <h1>React Error Handling Demo</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        <button type="button" onClick={handleThrowError}>Throw JS Error</button>
        <button type="button" onClick={handleAsyncError}>Trigger Async HTTP Error</button>
        <button type="button" onClick={handleRenderError}>Trigger React Render Error</button>
        <Link
          to="/this-page-does-not-exist"
          style={{
            textDecoration: "none",
            padding: "8px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            backgroundColor: "#f3f4f6",
            color: "#111827",
            fontWeight: 600,
          }}
        >
          Visit a missing route
        </Link>
      </div>

      <form noValidate onSubmit={handleFormValidationError} style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>
        <input
          type="text"
          name="email"
          placeholder="Enter email"
          style={{ padding: "8px 10px" }}
        />
        <button type="submit">Submit Form</button>
      </form>
    </>
  );
};

export default ErrorProvoker;