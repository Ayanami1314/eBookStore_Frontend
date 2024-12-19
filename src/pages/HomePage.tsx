import BookList from "../components/BookList";
import SearchBar, { Selector } from "../components/SearchBar";
import useBookQuery from "../stores/useBookQuery";

const Homepage = () => {
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
    <div>
      <SearchBar
        setSearchText={setSearchText}
        selector={selector}
        placeholder="输入以搜索"
      ></SearchBar>
      <div className="margin-box">
        <BookList></BookList>
      </div>
    </div>
  );
};

export default Homepage;
