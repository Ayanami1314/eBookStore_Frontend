import { useEffect, useState } from "react";
import { UserToAdmin } from "../hooks/useUsers";
import { Button, Flex, Table, type TableProps } from "antd";
import mockUsers from "../mock/admin/mockUsers";
type UserWithKey = UserToAdmin & { key: number };
const UserList = () => {
  // TODO: use real data
  // const { data: AllUsers, isLoading } = useUsers();
  const isLoading = false;

  const [AllUsersWithKey, setUsers] = useState<UserWithKey[] | undefined>([]);
  useEffect(() => {
    setUsers(
      mockUsers?.map((item: UserToAdmin, index: number) => ({
        ...item,
        key: index,
      }))
    );
  }, []);
  const handleBan = (id: number) => {
    // TODO: switch read backend ban user
    console.log("Try to ban:" + id);
    setUsers(
      AllUsersWithKey?.map((item) =>
        item.id === id ? { ...item, ban: true } : item
      )
    );
  };
  const handleUnBan = (id: number) => {
    console.log("Try to unban:" + id);
    setUsers(
      AllUsersWithKey?.map((item) =>
        item.id === id ? { ...item, ban: false } : item
      )
    );
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
      render: (ban: boolean) => (ban ? "已禁用" : "正常"),
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
