import { ProCard } from "@ant-design/pro-components";
import { Image, Typography } from "antd";
import { OrderItem } from "../hooks/useOrder";

const OrderCard = ({ id, book, number }: OrderItem) => {
  console.log("id：", id, "item：", book, "number：", number);
  return (
    <ProCard split="vertical" key={id}>
      <ProCard colSpan="20%">
        <div>
          <Image src={book.cover} width={80} height={80}></Image>
        </div>
      </ProCard>
      <ProCard split="horizontal">
        <ProCard colSpan="30%">
          <Typography.Text strong={true}>{book.title}</Typography.Text>
        </ProCard>
        <ProCard>
          <Typography.Text>{"购买数量：" + number}</Typography.Text>
        </ProCard>
      </ProCard>
    </ProCard>
  );
};

export default OrderCard;
