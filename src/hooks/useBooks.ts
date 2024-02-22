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
// TODO: 使用useItem换掉，还是看api怎么给
const fetchBooks = () => {
  const apiClientInstance = new apiClient<Book>("/books");
  return apiClientInstance.getAll();
};
const fetchSingleBook = (id: string) => {
  const apiClientInstance = new apiClient<Book>("/book");
  return apiClientInstance.getById(id);
};
const useBooks = () => {
  const { data, isError, isLoading } = useQuery<Book[], Error>({
    queryKey: ["books"],
    queryFn: fetchBooks,
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
