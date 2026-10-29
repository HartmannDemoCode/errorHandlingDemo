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

  return (
    <>
      <h1>React Error Handling Demo</h1>
      <button type="button" onClick={handleThrowError}>Throw JS Error</button>
      <button type="button" onClick={handleAsyncError} style={{ marginLeft: "10px" }}>
        Trigger Async HTTP Error
      </button>
      <button type="button" onClick={handleRenderError} style={{ marginLeft: "10px" }}>
        Trigger React Render Error
      </button>
    </>
  );
};

export default ErrorProvoker;