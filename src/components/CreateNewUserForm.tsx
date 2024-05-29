import { Form, Input, Button, Alert, message } from "antd";
import { useState } from "react";
import { registerNewUser } from "../hooks/useUsers";
import {
  emailRules,
  passwordRules,
  usernameRules,
} from "../utils/validateRules";
interface FormValues {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
}
const CreateNewUserForm = () => {
  // TODO: add validation
  // TODO: real email validation
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values: FormValues) => {
    if (values.password !== values.repeatPassword) {
      setRepeatSuccess(false);
      return;
    }
    setRepeatSuccess(true);
    console.log("Success:", values);
    registerNewUser({
      username: values.username,
      password: values.password,
      email: values.email,
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        messageApi.open({
          type: "success",
          content: "注册成功",
        });
      } else {
        messageApi.open({
          type: "error",
          content: res.message,
        });
      }
    });
  };
  const [repeatSuccess, setRepeatSuccess] = useState(true);
  return (
    <>
      {contextHolder}
      <Form onFinish={onFinish}>
        <Form.Item<FormValues>
          name="username"
          label="用户名称"
          rules={usernameRules}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<FormValues>
          name="password"
          label="输入密码"
          rules={passwordRules}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FormValues>
          name="repeatPassword"
          label="重复密码"
          rules={passwordRules}
        >
          <Input></Input>
        </Form.Item>
        {!repeatSuccess && (
          <Alert type="error" message="Passwords do not match"></Alert>
        )}
        <Form.Item<FormValues> name="email" label="电子邮件" rules={emailRules}>
          <Input></Input>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {"提交"}
        </Button>
      </Form>
    </>
  );
};

export default CreateNewUserForm;
