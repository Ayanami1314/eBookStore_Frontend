import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
interface Book {
  id: number;
  title: string;
  description: string;
  author: string;
  price: number;
  cover: string; // 图像资源的url
  sales: number;
  isbn?: string;
}
interface searchBooksProp {
  keyword: string;
  pageIndex: number;
  pageSize: number;
}
interface BookResponse {
  total: number;
  items: Book[];
}
const fetchBooks = async ({
  keyword,
  pageIndex,
  pageSize,
}: searchBooksProp) => {
  const apiClientInstance = new apiClient<BookResponse>("/books");
  return apiClientInstance
    .get({
      keyword: keyword,
      pageIndex: pageIndex,
      pageSize: pageSize,
    })
    .then((res) => res.items);
};
const fetchSingleBook = async (id: string | number) => {
  const apiClientInstance = new apiClient<Book>(`/book/${id}`);
  return apiClientInstance.get();
};
const useBooks = ({ keyword, pageIndex, pageSize }: searchBooksProp) => {
  const { data, isError, isLoading } = useQuery<Book[], Error>({
    queryKey: ["books", keyword],
    queryFn: () =>
      fetchBooks({
        keyword: keyword,
        pageIndex: pageIndex,
        pageSize: pageSize,
      }),
  });
  return { data, isError, isLoading };
};
const useSingleBook = (id: string | number) => {
  const { data, isError, isLoading } = useQuery<Book, Error>({
    queryKey: ["book", id],
    queryFn: () => fetchSingleBook(id),
  });
  return { data, isError, isLoading };
};

export { useBooks, useSingleBook };
export type { Book };
