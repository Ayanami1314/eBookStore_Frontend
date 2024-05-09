import React, { useEffect, useState } from "react";
import { Button, InputNumber, Skeleton, Space, Table, message } from "antd";
import type { TableProps } from "antd";

import { useCart, CartItem, useDeleteCartItem } from "../hooks/useCart";
import { Book } from "../hooks/useBook";
import useCartStore from "../stores/useCartStore";
import { Link } from "react-router-dom";

const CartTable: React.FC = () => {
  // NOTE：购物车内物品是悲观更新，但是总价和选择是乐观更新，来让用户知道已经完成操作，避免重复下单
  const { data, isError, isLoading } = useCart();
  type CartItemWithKey = CartItem & { key: number };
  type RowData = CartItemWithKey[] | undefined;
  const [dataWithKey, setDataWithKey] = useState<RowData>(
    data?.map((item: CartItem) => ({
      ...item,
      key: item.id,
    }))
  );

  const { setItems } = useCartStore();
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: RowData) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      const newTotalPrice = selectedRows
        ? selectedRows.reduce(
            (total: number, item: CartItemWithKey) =>
              item ? total + item.number * item.book.price : total,
            0
          )
        : 0;
      setTotalPrice(newTotalPrice);
      if (selectedRows)
        setItems(
          selectedRowKeys.map((key, index) => ({
            id: key as number,
            number: selectedRows[index].number,
          }))
        );
    },
  };
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
    // NOTE：乐观更新
    console.log("index:", index);
    const originData = dataWithKey;
    setDataWithKey(dataWithKey?.filter((item) => item.id !== index));
    deleteFn(index);
    if (deleteError) {
      messageApi.error("删除失败");
      setDataWithKey(originData);
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
  const columns: TableProps<CartItemWithKey>["columns"] = [
    {
      title: "书名",
      dataIndex: "book",
      key: "book_name",
      render: (text: Book) => (
        <Link to={`/home/book/${text.id}`}>{text.title}</Link>
      ),
    },
    {
      title: "数量",
      key: "number",
      render: (record) => (
        <InputNumber
          defaultValue={0}
          onChange={(value: number | null) =>
            handleNumberChange(record.id, value ?? 0)
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
        return record
          ? (record.book.price *
              (dataWithKey ? dataWithKey[index].number : 0)) /
              100
          : 0;
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
  useEffect(() => setTotalPrice(0), [data]);

  if (isError) {
    console.log("Error in Carttable");
  }
  if (isLoading) {
    return <Skeleton></Skeleton>;
  }
  return (
    <>
      {contextHolder}
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataWithKey}
      />
      {total_price !== undefined && <p>总价：{total_price / 100}元 </p>}
    </>
  );
};

export default CartTable;
