import { useState } from "react";
import useAnalysisStore from "../stores/useAnalysisStore";
import { Button, Col, Row, Skeleton, Statistic } from "antd";
import SearchBar from "./SearchBar";
import AnalysisDateFilter from "./AnalysisDateFilter";
import { AiFillAccountBook } from "react-icons/ai";
import AnalysisChart from "./AnalysisChart";
import { BookAnalysis } from "../hooks/useAnalysis";
import Title from "antd/es/typography/Title";
import BookCard from "./BookCard";

interface BookAnalysisProps {
  analysis: BookAnalysis[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
const FullBookAnalysis = ({
  analysis: data,
  isLoading,
  isError,
}: BookAnalysisProps) => {
  const setSearchText = useAnalysisStore((s) => s.setKeyword);
  const [mode, setMode] = useState<"card" | "graph">("card");
  const totalCost = data
    ? data.reduce((acc, cur) => {
        return acc + cur.total_price;
      }, 0)
    : 0;
  const totalNumber = data
    ? data.reduce((acc, cur) => {
        return acc + cur.total_sales;
      }, 0)
    : 0;
  return (
    <>
      {isLoading && <Skeleton />}
      {data && (
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <SearchBar
              setSearchText={setSearchText}
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
          <Col span={6}>
            <Title level={3}>{"请输入订单筛选时间"}</Title>
            <AnalysisDateFilter />
            <Title level={4}>{`书籍销售总额为：${totalCost / 100} 元`}</Title>
            <Title level={4}>{`书籍销售总数为：${totalNumber} 本`}</Title>
          </Col>
          <Col span={18}>
            <Row gutter={[32, 32]}>
              {mode == "card" &&
                data?.map((bookInfo) => (
                  <Col
                    xs={18}
                    sm={9}
                    md={6}
                    lg={6}
                    xl={6}
                    key={bookInfo.book.id}
                  >
                    <BookCard
                      book={bookInfo.book}
                      isError={isError}
                      isLoading={isLoading}
                      key={bookInfo.book.id}
                    />
                    <Statistic
                      title="总销量（件）"
                      value={bookInfo.total_sales}
                    />
                    <Statistic
                      title="总销售额"
                      value={bookInfo.total_price / 100}
                      precision={2}
                      prefix={<AiFillAccountBook />}
                      suffix="元"
                    />
                  </Col>
                ))}
            </Row>
            {mode == "graph" && (
              <Col span={24}>
                <AnalysisChart
                  analysis={data}
                  isError={isError}
                  isLoading={isLoading}
                />
              </Col>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default FullBookAnalysis;
