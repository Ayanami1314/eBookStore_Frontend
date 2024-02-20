import { Form, Input, Button } from "antd";
import { LoginParams } from "../services/login";
const LoginForm = () => {
  // TODO: add validation
  const handleSubmit = (values: LoginParams) => {
    // BUG: 这里不知道为什么不能用hook,怎么向后端发送数据？
    console.log(values);
  };

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item<LoginParams>
          name="username"
          label="用户名"
          rules={[{ required: true, message: "Please input your username." }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<LoginParams>
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
