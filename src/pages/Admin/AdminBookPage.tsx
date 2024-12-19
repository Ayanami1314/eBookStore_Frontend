import { Flex, Spin } from "antd";
import AdminBookTable from "../../components/AdminBookTable";
import SearchBar, { Selector } from "../../components/SearchBar";
import { useBooks } from "../../hooks/useBook";
import useBookQuery from "../../stores/useBookQuery";
import AddBookForm from "../../components/AddBookForm";
const AdminBookPage = () => {
  const { searchText, queryType } = useBookQuery();
  const { data, isLoading } = useBooks({
    keyword: searchText,
    pageIndex: 0,
    pageSize: 100,
    queryType: queryType,
  });
  const { setSearchText, setQueryType } = useBookQuery();
  const querySelectionChangeHandler = (value: string) => {
    console.log(value);
    if (value === "书名") {
      setQueryType("title");
    } else if (value === "标签") {
      setQueryType("tag");
    } else {
      setQueryType("title");
      console.log("warning: query selection 出现意外类型: " + value);
    }
  };
  const selector: Selector = {
    selections: ["书名", "标签"],
    onChange: (value) => querySelectionChangeHandler(value),
    defaultValue: "书名",
  };

  return (
    <Flex vertical gap="large">
      <SearchBar
        setSearchText={setSearchText}
        placeholder="输入以搜索"
        selector={selector}
      />
      <AddBookForm />
      {isLoading && <Spin />}
      {data && <AdminBookTable books={data} />}
    </Flex>
  );
};

export default AdminBookPage;
