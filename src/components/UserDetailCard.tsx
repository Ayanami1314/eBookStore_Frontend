import { ProForm, ProFormItem, ProFormText } from "@ant-design/pro-components";
import { Col, Flex, Row, Space, message } from "antd";
import UserUploadImage from "./UserUploadImage";
import TextArea from "antd/es/input/TextArea";

const UserDetailCard = () => {
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  return (
    <ProForm<{
      name: string;
      email?: string;
      avatar?: string; // TODO?
    }>
      // style={{
      //   margin: 16,
      //   flex: 1,
      // }}
      submitter={{
        render: (props, doms) => {
          return (
            <Row>
              <Col span={2} offset={11}>
                <Space>{doms}</Space>
              </Col>
            </Row>
          );
        },
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success("提交成功");
      }}
      params={{}}
      request={async () => {
        await waitTime(100);
        return {
          name: "",
          useMode: "chapter",
        };
      }}
    >
      <ProFormText
        style={{ flex: 1 }}
        name="name"
        label="用户名称"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
      />
      <ProFormText style={{ flex: 1 }} name="email" label="用户邮箱" />
      <Flex style={{ flex: 1 }}>
        <ProFormItem name="avatar" label="上传头像" style={{ flex: 2 }}>
          <UserUploadImage />
        </ProFormItem>
        <ProFormItem name="notes" label="个性签名" style={{ flex: 8 }}>
          <TextArea rows={4}></TextArea>
        </ProFormItem>
      </Flex>
    </ProForm>
  );
};

export default UserDetailCard;
