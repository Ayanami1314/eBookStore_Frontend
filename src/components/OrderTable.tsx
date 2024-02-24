import React from "react";
import { Skeleton, Table } from "antd";
import type { TableProps } from "antd";

import { useOrder, UserOrder } from "../hooks/useOrder";
import formatDate from "../utils/date";
import OrderCard from "./OrderCard";

const OrderTable: React.FC = () => {
  const { data, isError, isLoading } = useOrder();
  console.log(data);
  const columns: TableProps<UserOrder>["columns"] = [
    {
      title: "收货人",
      dataIndex: "receiver",
      key: "receiver",
    },
    {
      title: "联系方式",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "收货地址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "下单时间",
      key: "createdAt",
      // render text参数是当前行对应数据的值，record是本行数据
      render: (text) => {
        const date = new Date(text.createdAt);
        return formatDate(date);
      },
    },
  ];
  if (isError) {
    console.log("Error in Carttable");
  }
  if (isLoading) {
    return <Skeleton></Skeleton>;
  }

  return (
    <Table
      rowKey={(row) => row.id} // Fix: Return a string value for rowKey
      columns={columns}
      expandable={{
        expandedRowRender: (record) => {
          return record.items.map((order) => {
            console.log(order);
            return (
              order !== undefined && (
                <OrderCard
                  book={order.book}
                  key={order.id}
                  number={order.number}
                  id={order.id}
                ></OrderCard>
              )
            );
          });
        },
      }}
      dataSource={data}
    />
  );
};

export default OrderTable;
