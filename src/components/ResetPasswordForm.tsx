import { Button, Form, Input, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import useAuthStore from "../auth/useAuthStore";
import { changePassword } from "../hooks/useUsers";
import { CommonResponse } from "../services/type";
import { useNavigate } from "react-router-dom";
interface FormItems {
  password: string;
  newPassword: string;
  repeatPassword: string;
}
const ResetPassword = () => {
  const { password: savedPassword } = useAuthStore((s) => s.authinfo);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const sendToBackend = async (newPassword: string) => {
    const data = (await changePassword(newPassword)) as CommonResponse;
    if (data.ok) {
      messageApi.open({ type: "success", content: "修改成功！" });
      setTimeout(() => {
        navigate("/login");
      }, 2000); // 等待两秒后自动跳转
    }
    if (data.ok === false) {
      messageApi.open({ type: "error", content: data.message });
    }
  };
  const onFinish = (values: FormItems) => {
    if (values.password !== savedPassword) {
      messageApi.open({ type: "error", content: "密码错误！" });
      console.log("saved password: " + savedPassword);
      return;
    }
    if (values.newPassword !== values.repeatPassword) {
      messageApi.open({ type: "error", content: "两次密码不一致！" });
      return;
    }
    // send to backend
    sendToBackend(values.newPassword);
  };
  return (
    <>
      {contextHolder}
      <Form onFinish={onFinish}>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="旧密码"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new password" },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="repeatPassword"
            placeholder="新密码"
          />
        </Form.Item>
        <Form.Item
          name="repeatPassword"
          rules={[
            { required: true, message: "Please repeat your new password" },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="repeatPassword"
            placeholder="重复新密码"
          />
        </Form.Item>
        <Form.Item>
          <Button type="dashed" htmlType="submit">
            {"提交"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ResetPassword;
