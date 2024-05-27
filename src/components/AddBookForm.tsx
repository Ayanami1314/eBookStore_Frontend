import { Button, Form, Input, message } from "antd";
import { useAddSingleBook } from "../hooks/useBook";
import { useEffect } from "react";
interface FormItems {
  title: string;
  description: string;
  author: string;
  price: number;
  cover: string; // 图像资源的url
  isbn?: string;
}
const AddBookForm = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const formItemConfigs = [
    { key: "title", label: "标题", required: true },
    { key: "description", label: "简介", required: true },
    { key: "author", label: "作者", required: true },
    { key: "price", label: "标价", required: true },
    { key: "cover", label: "封面", required: true },
    { key: "isbn", label: "ISBN", required: false },
  ];
  const { addFn, isSuccess, isError, responseData } = useAddSingleBook();
  useEffect(() => {
    if (isSuccess) {
      messageApi.open({ type: "success", content: "添加成功!" });
    }
    if (isError) {
      messageApi.open({ type: "error", content: "添加失败!" });
    }
  }, [isSuccess, isError, responseData, messageApi]);
  const handleSubmit = (values: FormItems) => {
    console.log(values);
    addFn(values);
  };
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        {formItemConfigs.map((c) => (
          <Form.Item
            name={c.key}
            label={c.label}
            rules={[{ required: c.required, message: `请输入${c.label}!` }]}
          >
            <Input></Input>
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加书籍
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddBookForm;
