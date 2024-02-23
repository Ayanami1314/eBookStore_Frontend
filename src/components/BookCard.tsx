import { Book } from "../hooks/useBooks";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;
interface BookCardProps {
  book: Book;
  isLoading: boolean;
  isError: boolean;
}
const limitLengthText = (description: string) => {
  const limit = 50;
  if (description.length > limit) {
    return description.slice(0, limit) + "...";
  }
  return description;
};
const BookCard = ({ book, isLoading, isError }: BookCardProps) => {
  return (
    <>
      <Link to={`/home/book/${book.id}`}>
        <Card
          hoverable
          bordered={false}
          key={book.id}
          loading={isLoading && !isError}
          cover={book.cover ? <img alt="example" src={book.cover} /> : null}
          style={{ marginBottom: 16 }}
        >
          <Meta
            title={book.title}
            description={limitLengthText(book.description)}
          ></Meta>
        </Card>
      </Link>
    </>
  );
};

export default BookCard;
