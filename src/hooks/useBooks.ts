import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  price: number;
  cover: string; // 图像资源的url
  sales: number;
  ISBN?: string;
}
interface searchBooksProp {
  keyword: string;
  pageIndex: number;
  pageSize: number;
}
const fetchBooks = ({ keyword, pageIndex, pageSize }: searchBooksProp) => {
  const apiClientInstance = new apiClient<Book>("/books");
  return apiClientInstance.getAll({
    keyword: keyword,
    pageIndex: pageIndex,
    pageSize: pageSize,
  });
};
const fetchSingleBook = (id: string) => {
  const apiClientInstance = new apiClient<Book>("/book");
  return apiClientInstance.getById(id);
};
const useBooks = ({ keyword, pageIndex, pageSize }: searchBooksProp) => {
  const { data, isError, isLoading } = useQuery<Book[], Error>({
    queryKey: ["books"],
    queryFn: () =>
      fetchBooks({
        keyword: keyword,
        pageIndex: pageIndex,
        pageSize: pageSize,
      }),
  });
  return { data, isError, isLoading };
};
const useSingleBook = (id: string) => {
  const { data, isError, isLoading } = useQuery<Book, Error>({
    queryKey: ["book", id],
    queryFn: () => fetchSingleBook(id),
  });
  return { data, isError, isLoading };
};

export { useBooks, useSingleBook };
export type { Book };
