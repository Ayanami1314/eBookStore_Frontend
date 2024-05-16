import React from "react";

import { useEffect, useState } from "react";
import { UserToAdmin } from "../../hooks/useUsers";
import {
  Col,
  Row,
  Skeleton,
  Statistic,
  Table,
  Tag,
  type TableProps,
} from "antd";
// import mockUsers from "../../mock/admin/mockUsers";
// import { AiFillAccountBook } from "react-icons/ai";
import AnalysisDateFilter from "../../components/AnalysisDateFilter";
import Title from "antd/es/typography/Title";
import SearchBar from "../../components/SearchBar";
import { useUserAnalysis } from "../../hooks/useAnalysis";
import useAnalysisStore from "../../stores/useAnalysisStore";
import { dayToString } from "../../utils/date";
type UserWithKey = UserToAdmin & { key: number };
const AdminUserAnalysisPage = () => {
  // TODO: use real data
  const { startDate, endDate } = useAnalysisStore();
  const [keyword, setUserKeyWord] = useState<string>("");
  const TimeQuery = {
    start: dayToString(startDate),
    end: dayToString(endDate),
    keyword: keyword,
  };
  const { data: AllUsers, isLoading } = useUserAnalysis(TimeQuery);
  // const isLoading = false;
  const getRankIcon = (rank: number) => {
    // return <Title level={4}>{rank}</Title>;
    return <Tag color="blue">{rank}</Tag>;
  };
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
            id: item.user.id,
            nickname: item.user.nickname,
            balance: item.user.balance,
            key: index,
            ban: item.user.status === "ban",
            totalcost: item.totalcost,
          } as UserToAdmin & { key: number })
      )
    );
  }, [AllUsers]);
  const columns: TableProps<UserWithKey>["columns"] = [
    {
      title: "排名",
      key: "rank",
      render: (_, __, index) => getRankIcon(index + 1),
    },
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
      title: "消费额",
      key: "action",
      dataIndex: "totalcost",
      render: (cost: number) => (
        <Statistic
          title="总销售额"
          value={cost / 100}
          precision={2}
          // prefix={<AiFillAccountBook />}
          suffix="元"
        />
      ),
    },
  ];

  return (
    <>
      {isLoading && <Skeleton />}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={3}>{"用户消费排行榜"}</Title>
        </Col>
        <SearchBar
          placeholder="输入搜索用户"
          setSearchText={(keyword: string) => setUserKeyWord(keyword)}
        />
        <Col span={12}>
          <Title level={5}>{"请输入订单筛选时间"}</Title>
        </Col>
        <Col span={24}>
          <AnalysisDateFilter />
        </Col>
        <Col span={24}>
          <Table columns={columns} dataSource={AllUsersWithKey}></Table>
        </Col>
      </Row>
    </>
  );
};

export default AdminUserAnalysisPage;
