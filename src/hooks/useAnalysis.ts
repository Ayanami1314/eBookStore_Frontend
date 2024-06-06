import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Book } from "./useBook";
import { OrderQuery, UserOrder } from "./useOrder";
import { User } from "./useUsers";
export interface BookAnalysis {
  book: Book;
  total_price: number;
  total_sales: number;
}

export interface TimeRangeSearchQuery {
  start: string | null;
  end: string | null;
  keyword: string;
}
export interface UserAnalysis {
  user: User;
  totalcost: number;
}
const fetchBookAnalysis = (query: TimeRangeSearchQuery) => {
  const apiClientInstance = new apiClient<BookAnalysis>(
    `/admin/analysis/books`
  );
  return apiClientInstance.getAll(query);
};
const fetchMyBookAnalysis = (query: TimeRangeSearchQuery) => {
  const apiClientInstance = new apiClient<BookAnalysis>(
    `/user/me/analysis/books`
  );
  return apiClientInstance.getAll(query);
};

const useBookAnalysis = (query: TimeRangeSearchQuery) => {
  const { data, isLoading, isError } = useQuery<BookAnalysis[], Error>({
    queryKey: ["bookAnalysis", query],
    queryFn: () => fetchBookAnalysis(query),
  });
  return { data, isLoading, isError };
};
const useMyBookAnalysis = (query: TimeRangeSearchQuery) => {
  const { data, isLoading, isError } = useQuery<BookAnalysis[], Error>({
    queryKey: ["myBookAnalysis", query],
    queryFn: () => fetchMyBookAnalysis(query),
  });
  return { data, isLoading, isError };
};
const fetchUserAnalysis = (query: TimeRangeSearchQuery) => {
  const apiClientInstance = new apiClient<UserAnalysis>(
    `/admin/analysis/users`
  );
  return apiClientInstance.getAll(query);
};
const useUserAnalysis = (query: TimeRangeSearchQuery) => {
  const { data, isLoading, isError } = useQuery<UserAnalysis[], Error>({
    queryKey: ["userAnalysis", query],
    queryFn: () => fetchUserAnalysis(query),
  });
  return { data, isLoading, isError };
};

const fetchOrders = (query: OrderQuery) => {
  const apiClientInstance = new apiClient<UserOrder>("/admin/orders");
  return apiClientInstance.getAll(query);
};
const useOrderAnalysis = (query: OrderQuery) => {
  const { data, isLoading, isError } = useQuery<UserOrder[], Error>({
    queryKey: ["orderAnalysis", query],
    queryFn: () => fetchOrders(query),
  });
  return { data, isLoading, isError };
};
export {
  useBookAnalysis,
  useUserAnalysis,
  useOrderAnalysis,
  useMyBookAnalysis,
};
