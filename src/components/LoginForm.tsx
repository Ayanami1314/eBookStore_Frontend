import { Form, Input, Button, message } from "antd";
import login from "../services/login";
import useAuthStore from "../auth/useAuthStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface FormItems {
  username: string;
  password: string;
}
const LoginForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  // TODO: add validation
  const { authinfo, setAuth } = useAuthStore();
  const [, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (values: FormItems) => {
    login(values.username, values.password).then(({ ok, message }) => {
      setAuth({ ...authinfo, isUser: ok });
      setMessage(message);
      console.log("ok: " + ok);
      console.log("message: " + message);
      if (ok) {
        messageApi.open({
          type: "success",
          content: "登录成功！",
        });
        navigate("/home");
      } else
        messageApi.open({
          type: "error",
          content: "登录失败！",
        });
    });
    console.log(values);
  };

  return (
    <>
      {contextHolder}
      <Form onFinish={handleSubmit}>
        <Form.Item<FormItems>
          name="username"
          label="用户名"
          rules={[{ required: true, message: "Please input your username." }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<FormItems>
          name="password"
          label="密码"
          rules={[{ required: true, message: "Please input your password." }]}
        >
          <Input></Input>
        </Form.Item>
        <Button type="primary" htmlType="submit" key="loginFormButton">
          {"登录"}
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
