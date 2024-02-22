import { Row, Col } from "antd";
import { useBooks } from "../hooks/useBooks";
import fakeBooks from "../data_cache/fakeBooks";
import BookCard from "./BookCard";

const BookList = () => {
  // gutter: 边距
  // span: n/24 * 父容器最大宽度，类似fr
  let books = fakeBooks;
  const { data, isLoading, isError } = useBooks({
    keyword: "",
    pageIndex: 1,
    pageSize: 10,
  });
  // 简单改变loading 属性就可以做出skeleton效果
  if (!isError && data) {
    books = data;
  }
  return (
    <>
      <Row gutter={16}>
        {books.map((book) => (
          <Col xs={24} sm={12} md={8} key={book.id}>
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
