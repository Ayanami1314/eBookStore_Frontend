import { Book } from "../hooks/useBooks";

const fakeBooks: Book[] = new Array(10).fill(0).map((item, index) => ({
  id: index.toString(),
  book_name: `book ${index}`,
  show_title: `book ${index} title`,
  description: `book ${index} description`,
  image:
    "https://img.shields.io/github/issues/Okabe-Rintarou-0/BookStore-Frontend",
}));

export default fakeBooks;
