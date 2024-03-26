import { Book } from "../hooks/useBook";

const fakeBooks: Book[] = new Array(10).fill(0).map((item, index) => ({
  id: index,
  author: `book ${index}`,
  title: `book ${index} title`,
  description: `book ${index} description`,
  price: 0,
  sales: 0,
  cover:
    "https://img.shields.io/github/issues/Okabe-Rintarou-0/BookStore-Frontend",
}));

export default fakeBooks;
