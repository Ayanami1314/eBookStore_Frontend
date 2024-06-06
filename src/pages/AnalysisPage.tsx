import useAnalysisStore from "../stores/useAnalysisStore";
import { useMyBookAnalysis } from "../hooks/useAnalysis";
import { dayToString } from "../utils/date";
import FullBookAnalysis from "../components/FullBookAnalysis";
const AnalysisPage = () => {
  // const { startDate, endDate } = useAnalysisStore();
  // const timeQuery = {
  //   start: dayToString(startDate),
  //   end: dayToString(endDate),
  //   keyword: "",
  // };
  // const { data, isError, isLoading } = useMyBookAnalysis(timeQuery);
  // const AllBookAnalysis: BookAnalysis[] = data
  //   ? data.map((item) => ({
  //       book: item.book,
  //       total_price: item.total_price,
  //       total_sales: item.total_sales,
  //     }))
  //   : [];
  // const totalCost = AllBookAnalysis
  //   ? AllBookAnalysis.reduce((acc, cur) => {
  //       return acc + cur.total_price;
  //     }, 0)
  //   : 0;
  // const totalNumber = AllBookAnalysis
  //   ? AllBookAnalysis.reduce((acc, cur) => {
  //       return acc + cur.total_sales;
  //     }, 0)
  //   : 0;
  // return (
  //   <>
  //     <Row>
  //       <Col span={6}>
  //         <Title level={3}>{"请输入订单筛选时间"}</Title>
  //         <AnalysisDateFilter />
  //         <Title level={5}>{`书籍总价为：${totalCost / 100} 元`}</Title>

  //         <Title level={5}>{`书籍总数为：${totalNumber} 本`}</Title>
  //       </Col>
  //       <Col span={18}>
  //         <AnalysisChart
  //           analysis={AllBookAnalysis}
  //           isError={isError}
  //           isLoading={isLoading}
  //         ></AnalysisChart>
  //       </Col>
  //     </Row>
  //   </>
  // );
  const { startDate, endDate, keyword } = useAnalysisStore();
  const TimeQuery = {
    start: dayToString(startDate),
    end: dayToString(endDate),
    keyword: keyword,
  };
  const { data, isLoading, isError } = useMyBookAnalysis(TimeQuery);
  return (
    <FullBookAnalysis analysis={data} isLoading={isLoading} isError={isError} />
  );
};

export default AnalysisPage;
