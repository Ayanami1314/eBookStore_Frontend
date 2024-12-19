import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { RequestProps } from "../services/type";
import { gql, request } from "graphql-request";
import { GraphQL_PREFIX } from "../common/common";
interface Book {
  id: number;
  title: string;
  description?: string;
  author: string;
  price: number;
  cover?: string; // 图像资源的url
  sales: number;
  storage: number;
  isbn?: string;
  tags: string[];
}
type BookQueryType = "title" | "tag";
interface searchBooksProp {
  keyword: string;
  pageIndex: number;
  pageSize: number;
  queryType: BookQueryType;
}
interface BookResponse {
  total: number;
  books: Book[];
}
interface GraphQLBookResponse {
  getBooks: BookResponse
}
const fetchBooks = async ({
  keyword,
  pageIndex,
  pageSize,
  queryType,
}: searchBooksProp) => {
  // const apiClientInstance = new apiClient<BookResponse>("/books");
  // return apiClientInstance
  //   .get({
  //     keyword: keyword,
  //     pageIndex: pageIndex,
  //     pageSize: pageSize,
  //     queryType: queryType,
  //   })
  //   .then((res) => res.books);
  const booksQuery = gql`
query getBooks($keyword: String,$pageIndex: Int,$pageSize: Int,$queryType: String) {
  getBooks(keyword: $keyword,pageIndex: $pageIndex,pageSize: $pageSize,queryType: $queryType) {
    total
    books {
      id
      title
      description
      author
      price
      cover
      sales
      storage
      isbn
      tags
    }
  }
}
    `

  return request(
    `${GraphQL_PREFIX}`,
    booksQuery,
    { keyword: keyword, pageIndex: pageIndex, pageSize: pageSize, queryType: queryType }
    )
    .then(res => {
      console.log(res)
      return (res as GraphQLBookResponse).getBooks.books
    });
};
const fetchSingleBook = (id: number) => {
  const apiClientInstance = new apiClient<Book>(`/book/${id}`);
  return apiClientInstance.get({ id: id });
};
const deleteSingleBook = (id: number) => {
  const apiClientInstance = new apiClient<Book>(`/admin/book/${id}`);
  return apiClientInstance.delete({ id: id });
};


const useBooks = ({ keyword, pageIndex, pageSize, queryType}: searchBooksProp) => {
  const { data, isError, isLoading } = useQuery<Book[], Error>({
    queryKey: ["books", keyword],
    queryFn: () =>
      fetchBooks({
        keyword: keyword ?? "",
        pageIndex: pageIndex ?? 0,
        pageSize: pageSize ?? 20,
        queryType: queryType ?? "TITLE",
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
  storage: number;
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
export type { Book, BookQueryType };
