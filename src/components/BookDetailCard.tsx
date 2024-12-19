import { ProCard } from "@ant-design/pro-components";
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Row,
  Tag,
  Typography,
  message,
} from "antd";
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
  }, [isError, isSuccess, responseData, messageApi, navigate]);
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
              {/* <Typography.Title level={3}>{"基本信息"}</Typography.Title> */}
              <Typography.Title level={3} style={{ color: "red" }}>
                {`售价：${book.price / 100}（元）`}
              </Typography.Title>
            </Divider>
            {book.tags.length > 0 &&
              book.tags.map((tag) => (
                <Tag key={tag} color="red">
                  {tag}
                </Tag>
              ))}

            <Typography.Paragraph>
              <Row gutter={[16, 20]}>
                <Col span={8}>
                  <Typography.Title level={5}>
                    {`作者：${book.author}`}
                  </Typography.Title>
                </Col>
                <Col span={8}>
                  <Typography.Title
                    level={5}
                  >{`累积销量：${book.sales}`}</Typography.Title>
                </Col>
                <Col span={8}>
                  <Typography.Title level={5}>
                    {`当前库存：${book.storage}` +
                      (book.storage === 0 ? " (无库存)" : "")}
                  </Typography.Title>
                </Col>
              </Row>
            </Typography.Paragraph>
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
