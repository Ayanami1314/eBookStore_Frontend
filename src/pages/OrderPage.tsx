import OrderTable from "../components/OrderTable";
import { useOrder } from "../hooks/useOrder";
import useOrderQuery from "../stores/useOrderQuery";

const OrderPage = () => {
  const query = useOrderQuery((s) => s.query);
  const { data: orders, isError, isLoading } = useOrder(query);
  return (
    <OrderTable
      orders={orders}
      isError={isError}
      isLoading={isLoading}
    ></OrderTable>
  );
};

export default OrderPage;
