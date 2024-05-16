import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import useCartStore, { BuyItem } from "../stores/useCartStore";
import { useOrderPost } from "../hooks/useOrder";
import { CommonResponse } from "../services/type";
import { useNavigate } from "react-router-dom";
interface FormItems {
  receiver: string;
  address: string;
  tel: string;
}
const SettleButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { BuyItems, setItems } = useCartStore();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [backupItems, setBackupItems] = useState<BuyItem[]>(BuyItems);
  const navigate = useNavigate();
  const postOnSuccess = (data: CommonResponse) => {
    console.log(data);
    messageApi.open({ type: "success", content: "订单提交成功!请稍等......" });

    // TODO: 发现一个问题，这样跳转HomeLayout的菜单UI没有正常更新, 需要再研究antd的menu组件
    setTimeout(() => {
      navigate("/home/order");
    }, 2000);
  };

  const { postFn, isSuccess, responseData } = useOrderPost();
  useEffect(() => {
    if (isSuccess) {
      if (responseData?.ok)
        messageApi.open({ type: "success", content: "下单成功!" });
      else {
        messageApi.open({ type: "error", content: "下单失败!" });
        setItems(backupItems);
      }
    }
  }, [messageApi, isSuccess, responseData, setItems, backupItems]);
  const handleFinish = (values: FormItems) => {
    console.log(`下单数据: ${values.address} ${values.receiver} ${values.tel}`);
    console.log("buyItems: ");
    console.log(BuyItems);
    // NOTE: 提交时一次性更新全部商品数量，先更新前端状态，再等待从后端重新取数据
    const newBackupItems = [...BuyItems]; // ATTETION: set异步
    setBackupItems(newBackupItems);
    setItems(BuyItems.filter((item) => !item.buy));
    if (newBackupItems.length === 0) {
      messageApi.open({ type: "error", content: "未选择购买的物品!" });
      return;
    }
    const postItems = newBackupItems.filter((item) => item.buy);
    const postItemIds = postItems.map((item) => item.id);
    console.log(postItemIds);
    postFn(
      {
        address: values.address,
        receiver: values.receiver,
        tel: values.tel,
        itemIds: postItemIds,
      },
      { onSuccess: postOnSuccess } // Add the onSuccess property
    );
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
        title="填写收货信息"
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
