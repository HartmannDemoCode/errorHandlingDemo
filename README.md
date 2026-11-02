# Error handling recipe for a React project

This project is a step-by-step example of how to handle errors in a React app in a way that is easy for first-year students to understand.

The idea is simple:

1. Handle network and HTTP failures first
2. Then handle JavaScript runtime errors
3. Finally, add render-time protection with an Error Boundary

This matches the structure used in this project.

---

## What this project demonstrates

We are covering three main kinds of problems:

1. Network / HTTP errors
   - Example: fetch to a URL that returns 404
   - This is a real request failure, even if the app itself is still running

2. JavaScript runtime errors
   - Example: `throw new Error("...")` in an event handler
   - This is an exception thrown while JavaScript is running

3. React render errors
   - Example: a component throws while rendering
   - This is caught by an Error Boundary

---

## Step 1: Create the app shell

Start with a normal React app. In this project the shell is in `App.jsx`.

The app keeps a shared state value called `errorMessage`:

```jsx
const [errorMessage, setErrorMessage] = useState(null);
```

This value is displayed in a banner at the top of the app.

The banner component is a simple UI element that shows the current error message and has a clear button.

Example:

```jsx
<ErrorBanner
  errorMessage={errorMessage}
  onClear={() => setErrorMessage(null)}
/>
```

This makes the app feel consistent: when an error happens, the banner shows the message and the user can dismiss it.

---

## Step 2: Handle HTTP / network errors

The first demo is a fetch request that intentionally fails.

Example:

```jsx
const handleAsyncError = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/404");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    await response.json();
  } catch (error) {
    setErrorMessage(error.message);
  }
};
```

What is happening here?

- `fetch()` is a real network request
- the server responds with a 404
- the app checks `response.ok`
- if it is false, it throws an error
- the `catch` block handles it and shows the message to the user

This is the first important pattern:

- do not let the request fail silently
- catch the error
- turn it into a user-friendly message

This is the most common type of production error handling for data loading.

---

## Step 3: Handle JS runtime errors

The second type is a direct JavaScript error.

Example:

```jsx
const handleThrowError = () => {
  try {
    throw new Error("An error occurred in the event handler!");
  } catch (error) {
    console.error("Caught in event handler:", error);
    setErrorMessage(error.message);
  }
};
```

This is a normal `try/catch` pattern.

The key idea is:

- something throws
- the code catches it immediately
- the app updates the banner instead of crashing

This is useful for user actions like button clicks.

---

## Step 4: Add global error handling

Some errors are not caught inside your function. They happen outside the normal flow, for example:

- unhandled promise rejections
- uncaught browser errors
- unexpected runtime exceptions

To handle those, add a global error setup function like this:

```js
function setupGlobalErrorHandlers(setErrorMessage) {
  window.onerror = (message, source, lineno, colno, error) => {
    const detail = error?.message || String(message);
    setErrorMessage?.(`A global JavaScript error occurred: ${detail}`);
    return true;
  };

  window.onunhandledrejection = (event) => {
    const reason = event.reason?.message || String(event.reason);
    setErrorMessage?.(`An unhandled promise rejection occurred: ${reason}`);
    event.preventDefault();
  };
}
```

This is useful because not every bug is thrown in a `try/catch` block.

You call it once in `useEffect()`:

```jsx
useEffect(() => {
  setupGlobalErrorHandlers(setErrorMessage);

  return () => {
    window.onerror = null;
    window.onunhandledrejection = null;
  };
}, []);
```

This is a good place to centralize application-level error reporting.

---

## Step 5: Add a render error demo

Now we move to a different kind of problem: React render-time errors.

These are not caught by ordinary `try/catch` in the same way. They happen while React is rendering the component tree.

The demo component does this:

```jsx
export default function RenderErrorDemo({ showRenderError }) {
  if (showRenderError) {
    throw new Error("Our custom error occurred in the React component!");
  }

  return <Outlet context={{ showRenderError }} />;
}
```

This is a real render error.

If this component throws while React is rendering, we do not want the whole app to crash. We want a controlled fallback UI.

---

## Step 6: Use an Error Boundary
- (Specifically designed to catch render errors - errors that happen during the rendering phase of React components - not in event handlers or async code)

React has a built-in pattern for this: Error Boundary.

In the app, you wrap the component tree like this:

```jsx
<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onReset={() => {
    setErrorMessage(null);
    setShowRenderError(false);
  }}
>
  <RenderErrorDemo showRenderError={showRenderError} />
</ErrorBoundary>
```

The `FallbackComponent` prop tells React which UI to render if the child tree crashes.

In this project the fallback component is:

```jsx
export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>Something went wrong.</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
```

This is a very clean pattern because:

- the app keeps running
- the user sees a friendly message
- the user can reset the boundary and retry

---

## Step 7: Keep the error UI simple and realistic

A good practice is to separate the error types:

- HTTP errors → banner message
- JS runtime errors → banner message
- render errors → Error Boundary fallback UI

---

## Suggested exercise flow 

Exercise: Build the same pattern in a new app:

1. Create a form or button that triggers a fetch request
2. Make the fetch fail with 404 or 500
3. Wrap the `catch` block in `try/catch`
4. Set a banner error message
5. Create a button that throws an error manually
6. Catch it with `try/catch`
7. Add a global error setup function for unhandled cases
8. Create a component that throws during render
9. Wrap it in `ErrorBoundary`
10. Add a custom fallback component

---

## Final takeaway

Error handling in React is usually a combination of:

- `try/catch` for predictable errors
- `fetch` checks for HTTP failures
- global handlers for unexpected runtime issues
- `ErrorBoundary` for render crashes

That is the exact pattern used in this project.

If you follow these steps in order, the app becomes a clear teaching example of how real-world frontend error handling works.
