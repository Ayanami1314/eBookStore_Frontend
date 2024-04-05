import React from "react";
import { ProForm, ProFormItem, ProFormText } from "@ant-design/pro-components";
import { Col, Row, Space, message } from "antd";
import UserUploadImage from "./UserUploadImage";

const UserDetailCard = () => {
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      {...formItemLayout}
      submitter={{
        render: (props, doms) => {
          return (
            <Row>
              <Col span={20} offset={0}>
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
        width="md"
        name="name"
        label="用户名称"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
      />
      <ProFormText width="md" name="email" label="用户邮箱" />
      <ProFormItem name="avatar" label="上传头像">
        <UserUploadImage />
      </ProFormItem>
    </ProForm>
  );
};

export default UserDetailCard;
