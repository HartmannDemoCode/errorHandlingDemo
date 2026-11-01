
/**
 * Sets up global error handlers for the application.
 * @param {*} setErrorMessage - The function to call when an error is caught.
 * @description This function sets up window.onerror and window.onunhandledrejection to catch global errors and unhandled promise rejections, respectively.
 */
function setupGlobalErrorHandlers(setErrorMessage) {
  
  // Handle global JavaScript errors like: ReferenceError, TypeError, etc.
  window.onerror = (message, source, lineno, colno, error) => {
    const detail = error?.message || String(message);
    console.error("Global error caught:", { message, source, lineno, colno, error });
    setErrorMessage?.(`A global JavaScript error occurred: ${detail}`);
    return true;
  };

  // Handle unhandled promise rejections like: fetch errors, async function errors, etc.
  window.onunhandledrejection = (event) => {
    const reason = event.reason?.message || String(event.reason);
    console.error("Unhandled promise rejection:", event.reason);
    setErrorMessage?.(`An unhandled promise rejection occurred: ${reason}`);
    event.preventDefault();
  };
}

export { setupGlobalErrorHandlers };