function setupGlobalErrorHandlers(setErrorMessage) {
  window.onerror = (message, source, lineno, colno, error) => {
    const detail = error?.message || String(message);
    console.error("Global error caught:", { message, source, lineno, colno, error });
    setErrorMessage?.(`A global JavaScript error occurred: ${detail}`);
    return true;
  };

  window.onunhandledrejection = (event) => {
    const reason = event.reason?.message || String(event.reason);
    console.error("Unhandled promise rejection:", event.reason);
    setErrorMessage?.(`An unhandled promise rejection occurred: ${reason}`);
    event.preventDefault();
  };
}

export { setupGlobalErrorHandlers };