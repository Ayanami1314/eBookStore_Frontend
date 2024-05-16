import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  books: Book[];
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
    .then((res) => res.books);
};
const fetchSingleBook = (id: number) => {
  const apiClientInstance = new apiClient<Book>(`/book/${id}`);
  return apiClientInstance.get({ id: id });
};
const deleteSingleBook = (id: number) => {
  const apiClientInstance = new apiClient<Book>(`/admin/book/${id}`);
  return apiClientInstance.delete({ id: id });
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
const useSingleBook = (id: number) => {
  const { data, isError, isLoading } = useQuery<Book, Error>({
    queryKey: ["book", id],
    queryFn: () => fetchSingleBook(id),
  });
  return { data, isError, isLoading };
};
const addSingleBook = (newBookProps: AddBookProps) => {
  const apiClientInstance = new apiClient<Book>("/admin/book");
  return apiClientInstance.post({ data: newBookProps });
};
export type AddBookProps = {
  title: string;
  description: string;
  author: string;
  price: number;
  cover: string;
  isbn?: string;
};
const useAddSingleBook = () => {
  const queryClient = useQueryClient();
  const {
    mutate: addFn,
    isError,
    isSuccess,
    data: responseData,
  } = useMutation({
    mutationFn: addSingleBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
  return { addFn, isSuccess, isError, responseData };
};
const changeBook = (book: Book) => {
  const id = book.id;
  const data = { ...book };
  const apiClientInstance = new apiClient<Book>(`/admin/book/${id}`);
  return apiClientInstance.put({ data: data });
};
const useChangeBook = () => {
  const queryClient = useQueryClient();
  const {
    mutate: changeFn,
    isError,
    data: responseData,
  } = useMutation({
    mutationFn: changeBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
  return { changeFn, isError, responseData };
};
const useDeleteSingleBook = () => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteFn,
    isError,
    isSuccess,
    data: responseData,
  } = useMutation({
    mutationFn: deleteSingleBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
  return { deleteFn, isError, isSuccess, responseData };
};
export {
  useBooks,
  useSingleBook,
  useDeleteSingleBook,
  useAddSingleBook,
  useChangeBook,
};
export type { Book };
