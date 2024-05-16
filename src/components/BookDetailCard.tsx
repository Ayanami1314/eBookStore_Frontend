import { ProCard } from "@ant-design/pro-components";
import { Button, Card, Divider, Flex, Typography, message } from "antd";
import { Book, useDeleteSingleBook } from "../hooks/useBook";
import useAuthStore from "../auth/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface DetailProps {
  book: Book;
  addToCart: (id: number) => void;
}
const BookDetailCard = ({ book, addToCart }: DetailProps) => {
  const authinfo = useAuthStore((s) => s.authinfo);
  const isAdmin = authinfo.isAdmin;
  const { deleteFn, isError, isSuccess, responseData } = useDeleteSingleBook();
  const navigate = useNavigate();
  const handleDelete = (id: number) => {
    console.log(id);
    deleteFn(id);
  };
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (isSuccess && responseData?.ok) {
      messageApi.open({ type: "success", content: "删除成功!" });
      navigate("/home");
    }
    if (isError || responseData?.ok === false) {
      messageApi.open({ type: "error", content: "删除失败!" });
    }
  }, [isError, isSuccess, responseData, messageApi]);
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
            <Typography.Paragraph>{`作者：${book.author}    |    价格：${
              book.price / 100
            }    |    销量：${book.sales}`}</Typography.Paragraph>
            {/* {book.ISBN && (
        <Typography.Paragraph>{"ISBN：" + book.ISBN}</Typography.Paragraph>
      )} */}
            <Divider orientation="left">
              <Typography.Title level={3}>{"简介"}</Typography.Title>
            </Divider>
            <Typography.Paragraph>{book.description}</Typography.Paragraph>
          </Typography>
          <Divider />

          <Flex gap="middle">
            <Button
              type="default"
              size="large"
              onClick={() => addToCart(book.id)}
            >
              {"加入购物车"}
            </Button>
            {isAdmin && (
              <Button danger size="large" onClick={() => handleDelete(book.id)}>
                {"删除此书籍"}
              </Button>
            )}
          </Flex>
        </ProCard>
      </ProCard>
    </>
  );
};

export default BookDetailCard;
