import BookList from "../components/BookList";
import SearchBar from "../components/SearchBar";

const Homepage = () => {
  return (
    <div>
      <SearchBar></SearchBar>
      <div className="margin-box">
        <BookList></BookList>
      </div>
    </div>
  );
};

export default Homepage;
