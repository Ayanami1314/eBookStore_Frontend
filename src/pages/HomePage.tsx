import BookList from "../components/BookList";
import SearchBar from "../components/SearchBar";
import useBookQuery from "../stores/useBookQuery";

const Homepage = () => {
  const setSearchBook = useBookQuery((s) => s.setSearchText);
  return (
    <div>
      <SearchBar
        setSearchText={setSearchBook}
        placeholder="输入书名搜索"
      ></SearchBar>
      <div className="margin-box">
        <BookList></BookList>
      </div>
    </div>
  );
};

export default Homepage;
