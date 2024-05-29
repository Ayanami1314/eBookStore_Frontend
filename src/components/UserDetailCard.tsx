import { ProForm, ProFormItem, ProFormText } from "@ant-design/pro-components";
import { Col, Flex, Row, Space, message } from "antd";
import UserUploadImage from "./UserUploadImage";
import TextArea from "antd/es/input/TextArea";
import { changeUserInfo, changeUserInfoProps, useMe } from "../hooks/useUsers";

const UserDetailCard = () => {
  const { data: personInfo } = useMe();
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
      onFinish={async (values: changeUserInfoProps) => {
        console.log(values);
        changeUserInfo(values).then((res) => {
          console.log(res);
          if (res.ok) {
            message.success("提交成功");
          } else {
            message.error(res.message);
          }
        });
      }}
      params={{}}
      request={async () => {
        // NOTE: 表单初始化调用, 得到初始值
        return personInfo
          ? {
              name: personInfo.nickname,
              email: personInfo.email,
              avatar: personInfo.headImg,
              notes: personInfo.notes,
            }
          : {
              name: "",
              email: "",
              avatar: "",
              notes: "",
            };
      }}
    >
      <ProFormText
        style={{ flex: 1 }}
        name="name"
        label="用户名称"
        tooltip="最长为24字符，不含特殊字符"
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
