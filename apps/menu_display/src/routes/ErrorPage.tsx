import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.error("This is the error caught in error page:", error);
  console.error(error.name);

  let errorMessage: string;
  let errorStatus: number | string | undefined;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data || error.statusText;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "An unexpected error has occurred.";
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {errorMessage} {errorStatus && `(${errorStatus})`}
        </i>
      </p>
    </div>
  );
}
