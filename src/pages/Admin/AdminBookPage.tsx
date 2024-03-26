import { Flex, Spin } from "antd";
import AdminBookTable from "../../components/AdminBookTable";
import SearchBar from "../../components/SearchBar";
import { useBooks } from "../../hooks/useBook";
import useBookQuery from "../../stores/useBookQuery";
import AddBookForm from "../../components/AddBookForm";
const AdminBookPage = () => {
  const searchText = useBookQuery((s) => s.searchText);
  const { data, isLoading } = useBooks({
    keyword: searchText,
    pageIndex: 0,
    pageSize: 100,
  });
  return (
    <Flex vertical gap="large">
      <SearchBar />
      <AddBookForm />
      {isLoading && <Spin />}
      {data && <AdminBookTable books={data} />}
    </Flex>
  );
};

export default AdminBookPage;
