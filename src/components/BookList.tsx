import { Row, Col } from "antd";
import { useBooks } from "../hooks/useBooks";
import fakeBooks from "./fakeBooks";
import BookCard from "./BookCard";
import useBookQuery from "../stores/useBookQuery";

const BookList = () => {
  // gutter: 边距
  // span: n/24 * 父容器最大宽度，类似fr
  let books = fakeBooks;
  // TODO: 实现分页
  const searchText = useBookQuery((s) => s.searchText);
  const { data, isLoading, isError } = useBooks({
    keyword: searchText,
    pageIndex: 0,
    pageSize: 100,
  });
  // 简单改变loading 属性就可以做出skeleton效果
  if (!isError && data) {
    books = data;
  }
  return (
    <>
      <Row gutter={16}>
        {books.map((book) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={book.id}>
            <BookCard
              book={book}
              isError={isError}
              isLoading={isLoading}
              key={book.id}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default BookList;
