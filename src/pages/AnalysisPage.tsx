import { Col, Row } from "antd";
import AnalysisChart from "../components/AnalysisChart";
import AnalysisDateFilter from "../components/AnalysisDateFilter";
import Title from "antd/es/typography/Title";
import { useOrder } from "../hooks/useOrder";
import getAnalysisInfo from "../components/AnalysisInfo";
import useAnalysisStore from "../stores/useAnalysisStore";
import dayjs, { Dayjs } from "dayjs";
import useOrderQuery from "../stores/useOrderQuery";
const AnalysisPage = () => {
  const query = useOrderQuery((s) => s.query);
  const { data, isError, isLoading } = useOrder(query);
  const { startDate, endDate } = useAnalysisStore();
  const filter = (createdAt: Dayjs) =>
    (!startDate || startDate.isBefore(dayjs(createdAt))) &&
    (!endDate || endDate.isAfter(dayjs(createdAt)));

  const { AllBookInfo, totalCost, totalNumber } = getAnalysisInfo(data, filter);
  // console.log("AllBookInfo:" + AllBookInfo);
  return (
    <>
      <Row>
        <Col span={6}>
          <Title level={3}>{"请输入订单筛选时间"}</Title>
          <AnalysisDateFilter />
          <Title level={5}>{`书籍总价为：${totalCost / 100} 元`}</Title>

          <Title level={5}>{`书籍总数为：${totalNumber} 本`}</Title>
        </Col>
        <Col span={18}>
          <AnalysisChart
            AllBookInfo={AllBookInfo}
            isError={isError}
            isLoading={isLoading}
          ></AnalysisChart>
        </Col>
      </Row>
    </>
  );
};

export default AnalysisPage;
