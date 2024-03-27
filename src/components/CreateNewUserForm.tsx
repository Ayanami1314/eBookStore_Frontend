import { Form, Input, Button, Alert } from "antd";
import { useState } from "react";
interface FormValues {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
}
const CreateNewUserForm = () => {
  // TODO: add validation
  const onFinish = (values: FormValues) => {
    if (values.password !== values.repeatPassword) {
      setRepeatSuccess(false);
      return;
    }
    // TODO: send to backend
    setRepeatSuccess(true);
    console.log("Success:", values);
  };
  const [repeatSuccess, setRepeatSuccess] = useState(true);
  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item<FormValues>
          name="username"
          label="用户名称"
          rules={[{ required: true, message: "Please input your username." }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<FormValues>
          name="password"
          label="输入密码"
          rules={[{ required: true, message: "Please input your password." }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FormValues>
          name="repeatPassword"
          label="重复密码"
          rules={[
            { required: true, message: "Please input your password again." },
          ]}
        >
          <Input></Input>
        </Form.Item>
        {!repeatSuccess && (
          <Alert type="error" message="Passwords do not match"></Alert>
        )}
        <Form.Item<FormValues>
          name="email"
          label="电子邮件"
          rules={[{ required: true, message: "Please input your email." }]}
        >
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
