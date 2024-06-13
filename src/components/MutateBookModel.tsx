import { Button, Form, Input, Modal, Row, message } from "antd";
import { Book, useChangeBook } from "../hooks/useBook";
import { useEffect, useState } from "react";
import { ISBNRules, quantityRules } from "../utils/validateRules";
interface FormItems {
  title: string;
  description: string;
  author: string;
  price: number;
  cover: string; // 图像资源的url
  isbn?: string;
}
interface MutateBookModelProps {
  book: Book;
}
const MutateBookButton = ({ book }: MutateBookModelProps) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const formItemConfigs = [
    { key: "title", label: "标题", required: true },
    { key: "description", label: "简介", required: true },
    { key: "author", label: "作者", required: true },
    { key: "price", label: "标价(分)", required: true },
    //TODO 上传图片
    { key: "cover", label: "封面", required: true },
    { key: "storage", label: "库存量", required: true, rules: quantityRules },
    { key: "isbn", label: "ISBN", required: true, rules: ISBNRules },
  ];
  const { changeFn, isError, responseData } = useChangeBook();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = (values: FormItems) => {
    const newBook = { ...book, ...values };
    console.log("newBook: ", newBook);
    changeFn(newBook);
  };
  useEffect(() => {
    if (isError) {
      messageApi.open({ type: "error", content: "修改失败!" });
    }
  }, [isError, responseData, messageApi]);
  const handleOk = () => {
    form.submit(); // 调用表单提交onFinish，将ok按键点击和表单提交绑定
    setTimeout(() => {
      setIsModalOpen(false);
      messageApi.open({ type: "success", content: "表单已提交!" });
    }, 1000);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      {contextHolder}
      <Row gutter={[16, 16]}>
        <Button type="primary" onClick={showModal}>
          修改书籍信息
        </Button>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form
            form={form}
            initialValues={{
              title: book.title,
              description: book.description,
              author: book.author,
              price: book.price,
              cover: book.cover,
              storage: book.storage,
              isbn: book?.isbn,
            }}
            onFinish={handleSubmit}
          >
            {formItemConfigs.map((c) => (
              <Form.Item
                name={c.key}
                label={c.label}
                rules={[
                  { required: c.required, message: `请输入${c.label}!` },
                  ...(c.rules ? c.rules : []),
                ]}
              >
                <Input></Input>
              </Form.Item>
            ))}
          </Form>
        </Modal>
      </Row>
    </>
  );
};

export default MutateBookButton;
