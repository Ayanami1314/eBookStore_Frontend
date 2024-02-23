import React from "react";
import { Skeleton, Table } from "antd";
import type { TableProps } from "antd";

import { useOrder, UserOrder } from "../hooks/useOrder";
import formatDate from "../utils/date";

const OrderTable: React.FC = () => {
  const { data, isError, isLoading } = useOrder();
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
      // render text参数是当前单元格数据，record是本行数据
      render: (text) => {
        const date = new Date(text);
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

  return <Table columns={columns} dataSource={data} />;
};

export default OrderTable;
