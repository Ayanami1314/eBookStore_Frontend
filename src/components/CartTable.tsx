import React, { useEffect, useState } from "react";
import { Button, InputNumber, Skeleton, Space, Table, message } from "antd";
import type { TableProps } from "antd";

import {
  useCart,
  CartItem,
  useDeleteCartItem,
  useChangeCartItemNumber,
} from "../hooks/useCart";
import { Book } from "../hooks/useBook";
import useCartStore from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { CommonResponse } from "../services/type";

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
  const { BuyItems, setItems } = useCartStore();
  useEffect(() => {
    setItems(
      data
        ? data.map((item) => ({ id: item.id, number: item.number, buy: false }))
        : []
    );
  }, [data, setItems]);
  const [selectRows, setSelect] = useState<RowData>([]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: RowData) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelect(selectedRows);
      console.log(BuyItems);
      const newTotalPrice = selectedRows
        ? selectedRows.reduce(
            (total: number, item: CartItemWithKey) =>
              item ? total + item.number * item.book.price : total,
            0
          )
        : 0;
      setTotalPrice(newTotalPrice);
      if (selectedRows) {
        const newBuyItems = selectedRowKeys.map((key, index) => ({
          id: key as number,
          number: selectedRows[index].number,
          buy: true,
        }));
        console.log(newBuyItems);
        setItems(newBuyItems);
      }
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

  const failCallBack = (data: CommonResponse) => {
    messageApi.open({ type: "error", content: "商品数量更新失败!" });
    console.log(data);
  };
  const successCallBack = (data: CommonResponse) => {
    console.log("商品数量更新成功!");
    console.log(data);
  };
  const { changeFn } = useChangeCartItemNumber(successCallBack, failCallBack);
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
    if (value < 0) {
      messageApi.error("数量不能小于0");
      return;
    }
    const newData = dataWithKey?.map((item) =>
      item.id === id ? { ...item, number: value } : item
    );
    console.log(newData);
    setDataWithKey(newData);
    setItems(
      BuyItems.map((item) =>
        item.id === id ? { ...item, number: value } : item
      )
    );
    const newSelectRows = selectRows?.map((item) =>
      item.id === id ? { ...item, number: value } : item
    );
    changeFn({ id: id, number: value });
    setSelect(newSelectRows);
    setTotalPrice(cal_totalprice(newSelectRows));
  };
  const cal_totalprice = (data: CartItemWithKey[] | undefined) => {
    return data
      ? data
          .map((d) =>
            typeof d.book.price === "number" && typeof d.number === "number"
              ? d.book.price * d.number
              : 0
          )
          .reduce((total, item) => total + item, 0)
      : 0;
  };
  const [total_price, setTotalPrice] = useState<number>(
    cal_totalprice(selectRows)
  );
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
      render: (record: CartItemWithKey) => (
        <InputNumber
          defaultValue={record.number ? record.number : 0}
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
      render: (text) => <a>{text.price / 100}</a>,
    },
    {
      title: "总价",
      key: "total_price",
      // render第一个参数是当前单元格数据，第二个是本行数据
      render: (_, record, index) => {
        return record
          ? (record.book.price / 100) *
              (dataWithKey && dataWithKey[index].number
                ? dataWithKey[index].number
                : 0)
          : 0;
      },
    },
    {
      title: "操作",
      key: "action",
      render: (record: CartItemWithKey) => (
        <Space size="middle">
          <Button
            key={record.key}
            type="dashed"
            onClick={() => handleDelete(record.id)}
          >
            {"删除"}
          </Button>
        </Space>
      ),
    },
  ];

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
      {
        <p>
          总价：
          {typeof total_price === "number" && !isNaN(total_price)
            ? total_price / 100
            : 0}
          元{" "}
        </p>
      }
    </>
  );
};

export default CartTable;
