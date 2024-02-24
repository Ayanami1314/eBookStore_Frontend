import React, { useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import useCartStore from "../stores/useCartStore";
import { useOrderPost } from "../hooks/useOrder";
interface FormItems {
  receiver: string;
  address: string;
  tel: string;
}
const SettleButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { itemIds: selectIds, setIds, setHasOrder, hasOrder } = useCartStore();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const { postFn, isError, responseData } = useOrderPost();
  const handleFinish = (values: FormItems) => {
    console.log(`下单数据: ${values.address} ${values.receiver} ${values.tel}`);
    const originHasOrder = hasOrder;
    const originSelectIds = selectIds;
    // NOTE: 乐观更新，先更新前端状态，再等待从后端重新取数据
    setHasOrder(true);
    setIds([]);
    postFn({
      address: values.address,
      receiver: values.receiver,
      tel: values.tel,
      itemIds: selectIds,
    });
    if (isError) {
      messageApi.open({ type: "error", content: "下单失败!" });
      // 还原前端数据
      setHasOrder(originHasOrder);
      setIds(originSelectIds);
    } else {
      messageApi.open({ type: "success", content: "下单成功!" });
    }
    console.log("下单结果:" + responseData);
  };
  const handleOk = () => {
    form.submit(); // 调用表单提交onFinish，将ok按键点击和表单提交绑定
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        提交订单
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="receiver"
            rules={[{ required: true, message: "请填写收货人" }]}
          >
            <Input placeholder="收货人" />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "请填写收货地址" }]}
          >
            <Input placeholder="收货地址" />
          </Form.Item>
          <Form.Item
            name="tel"
            rules={[{ required: true, message: "请填写联系电话" }]}
          >
            <Input placeholder="联系电话" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SettleButton;
