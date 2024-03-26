import { Form, Input, message, Checkbox, Space } from "antd";
import useAuthStore from "../auth/useAuthStore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LoginFormPage } from "@ant-design/pro-components";
import login from "../services/login";
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

  const handleSubmit = async (values: FormItems) => {
    login(values.username, values.password).then(({ ok, message }) => {
      // TODO: 现在这里是直接给admin权限
      setAuth({
        ...authinfo,
        isUser: ok,
        isAdmin: ok,
        password: values.password,
      });
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
      <LoginFormPage
        backgroundImageUrl="https://s2.loli.net/2024/02/23/xURbve3prFJnuMo.webp"
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        layout="vertical"
        title="Book Store"
        subTitle="电子书城"
        onFinish={handleSubmit}
        style={{ height: "100vh" }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{"记住我"}</Checkbox>
            </Form.Item>
            {/*TODO: add forgot password */}
            <a className="login-form-forgot" href="">
              {"忘记密码？"}
            </a>

            <Link to="./create">{"立即注册！"}</Link>
          </Space>
        </Form.Item>
      </LoginFormPage>
    </>
  );
};

export default LoginForm;
