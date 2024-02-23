import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Book } from "./useBooks";
import { CommonResponse } from "../services/type";

export type OrderItem = {
  id: number;
  number: number;
  items: Book;
};
export type UserOrder = {
  id: 0;
  receiver: string;
  address: string;
  tel: string;
  createdAt: string; // generate Date by new Date(createdAt)
  items: OrderItem[];
};
type OrderPost = {
  address: string;
  receiver: string;
  tel: string;
  itemIds: number[];
};
const fetchOrder = () => {
  const orderClient = new apiClient<UserOrder>("/order");
  return orderClient.getAll();
};

const useOrder = () => {
  const { data, isError, isLoading } = useQuery<UserOrder[], Error>({
    queryKey: ["order"],
    queryFn: fetchOrder,
  });
  return { data, isError, isLoading };
};
const postOrder = (order: OrderPost) => {
  const orderClient = new apiClient<CommonResponse>("/order");
  const data = orderClient.post({ data: order });
  return data;
};
const useOrderPost = () => {
  const queryClient = useQueryClient();
  const {
    mutate: postFn,
    isError,
    data: responseData,
  } = useMutation({
    mutationFn: postOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });
  return { postFn, isError, responseData };
};
export { useOrder, useOrderPost };
