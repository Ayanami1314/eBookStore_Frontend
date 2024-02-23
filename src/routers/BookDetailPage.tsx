import { Button, Card, Skeleton, Typography, message } from "antd";
import { useSingleBook } from "../hooks/useBooks";
import { ProCard } from "@ant-design/pro-components";
import { useParams } from "react-router-dom";
import { Divider } from "antd";
import { useAddCartItem } from "../hooks/useCart";

const BookDetailPage = () => {
  const { id } = useParams();
  const { addFn, responseData, isError: addBookError } = useAddCartItem();
  const addHandler = (id: number) => {
    addFn(id);
    if (addBookError) {
      messageApi.open({ type: "error", content: "操作失败！" });
    } else {
      messageApi.open({ type: "success", content: "操作成功！" });
    }
  };
  console.log("加入购物车请求返回：", responseData);
  const [messageApi, contextHolder] = message.useMessage();
  if (!id) {
    throw new Error("路由缺少id参数");
  }
  const { data: book, isLoading, isError } = useSingleBook(id);
  if (isLoading) {
    return <Skeleton></Skeleton>;
  }
  if (!book) {
    return <div>{"书籍不存在"}</div>;
  }
  if (isError) {
    throw new Error("请求错误");
  }

  return (
    <>
      {contextHolder}
      <ProCard split="vertical">
        <ProCard colSpan="30%">
          <Card
            cover={book.cover ? <img alt="example" src={book.cover} /> : null}
            style={{ marginBottom: 16 }}
          ></Card>
        </ProCard>
        <ProCard headerBordered>
          <Typography style={{ minHeight: 360 }}>
            <Divider>
              <Typography.Title level={2}>{book.title}</Typography.Title>
            </Divider>
            <Divider orientation="left">
              <Typography.Title level={3}>{"基本信息"}</Typography.Title>
            </Divider>
            <Typography.Paragraph>{`作者：${book.author}    |    价格：${book.price}    |    销量：${book.sales}`}</Typography.Paragraph>
            {/* {book.ISBN && (
            <Typography.Paragraph>{"ISBN：" + book.ISBN}</Typography.Paragraph>
          )} */}
            <Divider orientation="left">
              <Typography.Title level={3}>{"简介"}</Typography.Title>
            </Divider>
            <Typography.Paragraph>{book.description}</Typography.Paragraph>
          </Typography>
          <Divider />
          <Button
            type="default"
            size="large"
            onClick={() => addHandler(book.id)}
          >
            {"加入购物车"}
          </Button>
        </ProCard>
      </ProCard>
    </>
  );
};

export default BookDetailPage;
