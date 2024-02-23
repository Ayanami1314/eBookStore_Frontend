import React, { useEffect, useState } from "react";
import { Button, InputNumber, Skeleton, Space, Table, message } from "antd";
import type { TableProps } from "antd";

import { useCart, CartItem, useDeleteCartItem } from "../hooks/useCart";
import { Book } from "../hooks/useBooks";

const CartTable: React.FC = () => {
  const { data, isError, isLoading } = useCart();
  type CartItemWithKey = CartItem & { key: number };
  const [dataWithKey, setDataWithKey] = useState<CartItemWithKey[] | undefined>(
    data?.map((item: CartItem) => ({
      ...item,
      key: item.id,
    }))
  );
  useEffect(() => {
    setDataWithKey(
      data?.map((item: CartItem) => ({
        ...item,
        key: item.id,
      }))
    );
  }, [data]);
  //   console.log(data);
  const { deleteFn, isError: deleteError } = useDeleteCartItem();
  const [messageApi, contextHolder] = message.useMessage();
  const handleDelete = (index: number) => {
    // NOTE：悲观更新
    console.log("index:", index);
    deleteFn(index);
    if (deleteError) {
      messageApi.error("删除失败");
    } else {
      messageApi.success("删除成功");
    }
  };
  const handleNumberChange = (id: number, value: number) => {
    const newData = dataWithKey?.map((item) => {
      if (item.id === id) {
        return { ...item, number: value };
      }
      return item;
    });
    setDataWithKey(newData);
  };
  const handleSettle = () => {};
  const columns: TableProps<CartItem>["columns"] = [
    {
      title: "书名",
      dataIndex: "book",
      key: "book_name",
      render: (text: Book) => <a>{text.title}</a>,
    },
    {
      title: "数量",
      key: "number",
      render: (index) => (
        <InputNumber
          defaultValue={index.number}
          onChange={(value: number | null) =>
            handleNumberChange(index.id, value ?? 0)
          }
        ></InputNumber>
      ),
    },
    {
      title: "单价",
      dataIndex: "book",
      key: "book_price",
      render: (text) => <a>{text.price / 100}</a>, // api里面返回的price是分为单位
    },
    {
      title: "总价",
      key: "total_price",
      // render第一个参数是当前单元格数据，第二个是本行数据
      render: (_, record, index) => {
        return (
          (record.book.price * (dataWithKey ? dataWithKey[index].number : 0)) /
          100
        );
      },
    },
    {
      title: "操作",
      key: "action",
      // NOTE: index:当前行元素(CartItem)
      render: (index) => (
        <Space size="middle">
          <Button
            key={index.key}
            type="dashed"
            onClick={() => handleDelete(index.id)}
          >
            {"删除"}
          </Button>
        </Space>
      ),
    },
  ];
  const [total_price, setTotalPrice] = useState<number>(
    dataWithKey
      ?.map((d) => d.book.price * d.number)
      .reduce((total, item) => total + item, 0) ?? 0
  );
  useEffect(() => {
    setTotalPrice(
      dataWithKey
        ?.map((d) => d.book.price * d.number)
        .reduce((total, item) => total + item, 0) ?? 0
    );
  }, [dataWithKey]);

  if (isError) {
    console.log("Error in Carttable");
  }
  if (isLoading) {
    return <Skeleton></Skeleton>;
  }

  return (
    <>
      {contextHolder}
      <Table columns={columns} dataSource={dataWithKey} />
      {total_price && <p>总价：{total_price / 100}元 </p>}
      <Button type="default" onClick={handleSettle}>
        {"去结算"}
      </Button>
    </>
  );
};

export default CartTable;
