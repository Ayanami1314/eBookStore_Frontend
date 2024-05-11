import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Book } from "./useBook";
import { CommonResponse } from "../services/type";

export type OrderItem = {
  // ~~TODO~~: 考虑到书籍价格会变，应该由后端提供（当时的）总价，而不是前端计算
  id: number;
  number: number;
  book: Book;
  // totalPrice?: number;
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
const useOrderPost = (userOnSuccess?: () => void, userOnError?: () => void) => {
  const queryClient = useQueryClient();
  const {
    mutate: postFn,
    isError,
    isPending,
    isSuccess,
    data: responseData,
  } = useMutation({
    mutationFn: postOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
      console.log("order post succeed!");
      userOnSuccess && userOnSuccess();
    },
    onError: () => {
      console.log("order post failed!");
      console.log(responseData);
      userOnError && userOnError();
    },
  });
  return { postFn, isError, isPending, isSuccess, responseData };
};
export { useOrder, useOrderPost };
export type { OrderPost };
