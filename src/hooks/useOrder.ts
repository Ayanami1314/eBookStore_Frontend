import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Book } from "./useBooks";

type OrderItem = {
  id: 0;
  receiver: string;
  address: string;
  tel: string;
  createdAt: string; // generate Date by new Date(createdAt)
  items: Book[];
};
type OrderPost = {
  address: string;
  receiver: string;
  tel: string;
  itemIds: number[];
};
const fetchOrder = () => {
  const orderClient = new apiClient<OrderItem>("/order");
  return orderClient.getAll();
};

const useOrder = () => {
  const { data, isError, isLoading } = useQuery<OrderItem[], Error>({
    queryKey: ["order"],
    queryFn: fetchOrder,
  });
  return { data, isError, isLoading };
};
const postOrder = (order: OrderPost) => {
  const orderClient = new apiClient<OrderPost>("/order");
  const data = orderClient.post(order);
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
export type { OrderItem };
