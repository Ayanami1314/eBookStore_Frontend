import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <>
      <Link to="./create">{"没有账号？现在立即注册！"}</Link>
      <LoginForm></LoginForm>
    </>
  );
};

export default LoginPage;
