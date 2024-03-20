import { ProCard } from "@ant-design/pro-components";
import { Button, Card, Divider, Typography } from "antd";
import { Book } from "../hooks/useBooks";

interface DetailProps {
  book: Book;
  addToCart: (id: number) => void;
}
const BookDetailCard = ({ book, addToCart }: DetailProps) => {
  return (
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
        <Button type="default" size="large" onClick={() => addToCart(book.id)}>
          {"加入购物车"}
        </Button>
      </ProCard>
    </ProCard>
  );
};

export default BookDetailCard;
