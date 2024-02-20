import React from "react";
import { Book } from "../hooks/useBooks";
import { Card } from "antd";
const { Meta } = Card;
interface BookCardProps {
  book: Book;
  isLoading: boolean;
  isError: boolean;
}
const BookCard = ({ book, isLoading, isError }: BookCardProps) => {
  return (
    <Card
      hoverable
      bordered={false}
      key={book.id}
      loading={isLoading && !isError}
      cover={book.image ? <img alt="example" src={book.image} /> : null}
      style={{ marginBottom: 16 }}
    >
      <Meta title={book.show_title} description={book.description}></Meta>
    </Card>
  );
};

export default BookCard;
