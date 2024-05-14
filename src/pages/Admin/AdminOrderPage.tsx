import { Col, Row } from "antd";
import OrderTable from "../../components/OrderTable";
import SearchBar from "../../components/SearchBar";
import { useOrder } from "../../hooks/useOrder";
import useOrderQuery from "../../stores/useOrderQuery";

const AdminOrderPage = () => {
  const { query, setSearchText } = useOrderQuery();
  const { data, isError, isLoading } = useOrder(query);
  return (
    <Row gutter={[16, 16]}>
      <SearchBar setSearchText={setSearchText} />
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
