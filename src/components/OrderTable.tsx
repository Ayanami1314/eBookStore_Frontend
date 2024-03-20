import type { TableProps } from "antd";

import { useOrder, UserOrder } from "../hooks/useOrder";
import OrderCard from "./OrderCard";
import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { GetRef, TableColumnType } from "antd";
import { Button, Input, Space, Table, Skeleton } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
// import moment from "moment";

type InputRef = GetRef<typeof Input>;
type UserOrderWithRenderItems = UserOrder & {
  bookTitles: string;
  formatTime: string;
};
type DataIndex = keyof UserOrderWithRenderItems;
const OrderTable: React.FC = () => {
  // TODO：使用DatePicker完成基于日期范围的筛选
  // HINT： 过滤和排序功能是基于数据源（dataSource）的
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<UserOrderWithRenderItems> => ({
    // 下拉搜索筛选框
    filterDropdown: ({
      // 全是内置参数
      setSelectedKeys,
      selectedKeys, // 内置参数：代表用户选择的过滤值的数组
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`搜索`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            重置
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            筛选
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            关闭
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    // NOTE: 文档的示例函数，但是select报错，searchInput的类型推断不对
    // onFilterDropdownOpenChange: (visible) => {
    //   if (visible) {
    //     // 100ms之后执行回调
    //     setTimeout(() => searchInput.current && searchInput.current?.select(), 100);
    //   }
    // },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const toNewData = (data: UserOrder[] | undefined) => {
    return data?.map((order) => ({
      ...order,
      bookTitles: order.items.map((item) => item.book.title).toString(),
      formatTime: new Date(order.createdAt).toLocaleString(),
    }));
  };
  const { data, isError, isLoading } = useOrder();
  const [newdata, setNewData] = useState<
    UserOrderWithRenderItems[] | undefined
  >(toNewData(data));
  useEffect(() => {
    setNewData(toNewData(data));
  }, [data]);
  const columns: TableProps<UserOrderWithRenderItems>["columns"] = [
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
      key: "formatTime",
      dataIndex: "formatTime",
      ...getColumnSearchProps("formatTime"),
      // filterDropdown: ({
      //   setSelectedKeys,
      //   selectedKeys,
      //   confirm,
      //   clearFilters,
      // }) => (
      //   <Space direction="vertical">
      //     <DatePicker.RangePicker
      //       value={
      //         selectedKeys[0]
      //           ? [moment(selectedKeys[0]), moment(selectedKeys[1])]
      //           : []
      //       }
      //       onChange={(dates) => {
      //         console.log(
      //           "dates:" + dates?.map((date) => date?.format("YYYY-MM-DD"))
      //         );
      //         setSelectedKeys(
      //           dates
      //             ? [
      //                 dates[0].format("YYYY-MM-DD"),
      //                 dates[1].format("YYYY-MM-DD"),
      //               ]
      //             : []
      //         );
      //       }}
      //     />
      //     <Space>
      //       <Button
      //         type="primary"
      //         onClick={confirm}
      //         size="small"
      //         style={{ width: 90 }}
      //       >
      //         Search
      //       </Button>
      //       <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
      //         Reset
      //       </Button>
      //     </Space>
      //   </Space>
      // ),
      // // FIXME：has bugs here
      // // FIXME: onFilter 的value参数本来应该对应selectedKeys，是一个数组，但是实际上只有一个值，导致循环输入第一个和第二个数，出现致命错误
      // onFilter: (value, record) => {
      //   const startDate = moment(value[0]);
      //   const endDate = moment(value[1]);
      //   const recordDate = moment(record.createdAt);
      //   // console.log("value:" + value);
      //   // console.log("recordDate:" + recordDate.format("YYYY-MM-DD"));
      //   // console.log("startDate:" + startDate.format("YYYY-MM-DD"));
      //   // console.log("endDate:" + endDate.format("YYYY-MM-DD"));
      //   return recordDate.isBetween(startDate, endDate, "days", "[]");
      // // },
      // render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "书籍汇总",
      key: "bookTitles",
      dataIndex: "bookTitles",
      ...getColumnSearchProps("bookTitles"),
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
      dataSource={newdata}
    />
  );
};

export default OrderTable;
