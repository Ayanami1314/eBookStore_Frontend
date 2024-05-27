import { useEffect, useState } from "react";
import { UserToAdmin, changeBan, useAllUsers } from "../hooks/useUsers";
import { Button, Flex, Table, Tag, type TableProps } from "antd";
// import mockUsers from "../mock/admin/mockUsers";
type UserWithKey = UserToAdmin & { key: number };
const UserList = () => {
  const { data: AllUsers, isLoading } = useAllUsers();
  // const isLoading = false;

  const [AllUsersWithKey, setUsers] = useState<UserWithKey[] | undefined>([]);
  useEffect(() => {
    setUsers(
      // mockUsers?.map((item: UserToAdmin, index: number) => ({
      //   ...item,
      //   key: index,
      // }))
      AllUsers?.map(
        (item, index: number) =>
          ({
            id: item.id,
            nickname: item.nickname,
            balance: item.balance,
            key: index,
            ban: item.status === "ban",
          } as UserToAdmin & { key: number })
      )
    );
  }, [AllUsers]);
  const handleBan = (id: number) => {
    console.log("Try to ban:" + id);
    setUsers(
      AllUsersWithKey?.map((item) =>
        item.id === id ? { ...item, ban: true } : item
      )
    );
    // NOTE:乐观更新
    changeBan(id, true);
  };
  const handleUnBan = (id: number) => {
    console.log("Try to unban:" + id);
    setUsers(
      AllUsersWithKey?.map((item) =>
        item.id === id ? { ...item, ban: false } : item
      )
    );
    changeBan(id, false);
  };
  const columns: TableProps<UserWithKey>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "昵称",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "消费",
      dataIndex: "totalcost",
      key: "totalcost",
    },
    {
      title: "余额",
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: "状态",
      dataIndex: "ban",
      key: "ban",
      render: (ban: boolean) =>
        ban ? (
          <Tag color="red">{"已禁用"}</Tag>
        ) : (
          <Tag color="green">{"正常"}</Tag>
        ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Flex gap="small">
          <Button type="primary" danger onClick={() => handleBan(record.id)}>
            禁用
          </Button>
          <Button type="primary" onClick={() => handleUnBan(record.id)}>
            解禁
          </Button>
        </Flex>
      ),
    },
  ];
  return (
    <>
      {isLoading && <div>loading...</div>}
      <Table columns={columns} dataSource={AllUsersWithKey}></Table>
    </>
  );
};

export default UserList;
