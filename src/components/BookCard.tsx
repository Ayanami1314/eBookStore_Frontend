import { Book } from "../hooks/useBook";
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
  const handleError = (e: any) => {
    e.target.src =
      "https://img.tukuppt.com/png_preview/00/04/81/SYZxWQlAr9.jpg!/fw/780";
  };
  return (
    <>
      <Link to={`/home/book/${book.id}`}>
        <Card
          hoverable
          bordered={false}
          key={book.id}
          loading={isLoading && !isError}
          cover={
            book.cover ? (
              <img alt="example" src={book.cover} onError={handleError} />
            ) : null
          }
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
