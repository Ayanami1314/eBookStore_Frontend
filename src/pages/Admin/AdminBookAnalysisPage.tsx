// import { TimeRangeQuery, useBookAnalysis } from "../../hooks/useAnalysis";
// import useAnalysisStore from "../../stores/useAnalysisStore";
// import { dayToString } from "../../utils/date";
import { Button, Col, Row, Statistic } from "antd";
import BookCard from "../../components/BookCard";
import mockAnalysis from "../../mock/admin/mockAnalysis";
import { AiFillAccountBook } from "react-icons/ai";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";
import AnalysisChart from "../../components/AnalysisChart";
import useBookQuery from "../../stores/useBookQuery";

const AdminBookAnalysisPage = () => {
  // const timeRange = useAnalysisStore((s) => ({
  //   start: s.startDate,
  //   end: s.endDate,
  // }));
  // const timeQuery: TimeRangeQuery = {
  //   start: dayToString(timeRange.start),
  //   end: dayToString(timeRange.end),
  // };
  // const { data, isLoading, isError } = useBookAnalysis(timeQuery);
  const [mode, setMode] = useState<"card" | "graph">("card");
  const data = mockAnalysis;
  const allbookinfo = data.map((item) => ({
    ...item.book,
    number: item.total_sales,
  }));
  const isLoading = false;
  const isError = false;
  const setSearchBook = useBookQuery((s) => s.setSearchText);
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <SearchBar
            setSearchText={setSearchBook}
            placeholder="输入书名搜索"
          ></SearchBar>
        </Col>
        <Col span={6}>
          <Button
            size={"large"}
            onClick={() => setMode(mode === "card" ? "graph" : "card")}
          >
            {mode === "card" ? "切换到图表" : "切换到卡片"}
          </Button>
        </Col>
        {mode == "card" &&
          data?.map((bookInfo) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={bookInfo.book.id}>
              <BookCard
                book={bookInfo.book}
                isError={isError}
                isLoading={isLoading}
                key={bookInfo.book.id}
              />
              <Statistic title="总销量（件）" value={bookInfo.total_sales} />
              <Statistic
                title="总销售额"
                value={bookInfo.total_price / 100}
                precision={2}
                prefix={<AiFillAccountBook />}
                suffix="元"
              />
            </Col>
          ))}
        {mode == "graph" && (
          <Col span={24}>
            <AnalysisChart
              AllBookInfo={allbookinfo}
              isError={isError}
              isLoading={isLoading}
            />
          </Col>
        )}
      </Row>
    </>
  );
};

export default AdminBookAnalysisPage;
