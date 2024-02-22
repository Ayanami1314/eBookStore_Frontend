import { Button } from "antd";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError();
  // TODO: send the log to backend
  console.log(error);
  const navigate = useNavigate();
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <>
      <h1>Oops...</h1>
      <div>
        {isRouteErrorResponse(error) ? "Invalid Page" : "Unexpected Error"}
      </div>
      <Button type="primary" onClick={onClick}>
        {"返回主页"}
      </Button>
    </>
  );
};

export default ErrorPage;
