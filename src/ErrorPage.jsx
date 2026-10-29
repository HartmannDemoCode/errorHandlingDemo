import { isRouteErrorResponse, useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const errorMessage = isRouteErrorResponse(error)
    ? error.statusText || error.data || "Unexpected route error"
    : error?.message || "An unexpected error has occurred.";

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}