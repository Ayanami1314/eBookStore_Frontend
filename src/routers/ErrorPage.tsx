import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  // TODO: send the log to backend
  console.log(error);
  return (
    <>
      <h1>Oops...</h1>
      <div>
        {isRouteErrorResponse(error) ? "Invalid Page" : "Unexpected Error"}
      </div>
    </>
  );
};

export default ErrorPage;
