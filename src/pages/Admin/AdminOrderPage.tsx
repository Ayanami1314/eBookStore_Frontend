import { Col, Row } from "antd";
import OrderTable from "../../components/OrderTable";
import SearchBar from "../../components/SearchBar";
import useOrderQuery from "../../stores/useOrderQuery";
import { useOrder } from "../../hooks/useOrder";
import useAnalysisStore from "../../stores/useAnalysisStore";
import AnalysisDateFilter from "../../components/AnalysisDateFilter";
import { dayToString } from "../../utils/date";
const AdminOrderPage = () => {
  // const queryClient = useQueryClient();
  const { query, setSearchText } = useOrderQuery();
  const { startDate, endDate } = useAnalysisStore();
  const { data, isError, isLoading } = useOrder({
    ...query,
    start: dayToString(startDate),
    end: dayToString(endDate),
  });

  return (
    <Row gutter={[16, 16]}>
      <Col span={16}>
        <SearchBar setSearchText={setSearchText} />
      </Col>
      <Col span={8}>
        <AnalysisDateFilter />
      </Col>
      <Col span={24}>
        <OrderTable
          orders={data}
          isError={isError}
          isLoading={isLoading}
        ></OrderTable>
      </Col>
    </Row>
  );
};

export default AdminOrderPage;
