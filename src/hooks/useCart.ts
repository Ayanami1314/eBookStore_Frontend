import apiClient from "../services/api-client";
import { Book } from "./useBook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CommonResponse } from "../services/type";

// TODO: 目前的后端不支持购物车的搜索
type CartItem = { id: number; book: Book; number: number };

const fetchCart = () => {
  const CartApi = new apiClient<CartItem>("/cart");
  return CartApi.getAll();
};

const deleteCartItem = (id: number) => {
  const CartApi = new apiClient<CommonResponse>(`/cart/${id}`);
  const cart = CartApi.delete(); // params: id
  return cart;
};
interface changeCartItemNumberProps {
  id: number;
  number: number;
}
const changeCartItemNumber = ({ id, number }: changeCartItemNumberProps) => {
  const CartApi = new apiClient<CommonResponse>(`/cart/${id}`);
  const cart = CartApi.put({ params: { number: number } });
  return cart;
};

const addCartItem = (bookid: number) => {
  const CartApi = new apiClient<CommonResponse>("/cart");
  const cart = CartApi.put({ params: { bookId: bookid } });
  return cart;
};

const useCart = () => {
  const { data, isError, isLoading } = useQuery<CartItem[], Error>({
    queryKey: ["cart", "all"],
    queryFn: fetchCart,
  });
  return { data, isError, isLoading };
};
const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteFn,
    isError,
    data: responseData,
  } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", "all"] });
    },
  });

  return { deleteFn, isError, responseData };
};
const useAddCartItem = () => {
  const queryClient = useQueryClient();
  const {
    mutate: addFn,
    isError,
    data: responseData,
  } = useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", "all"] });
      console.log("addCartItem success");
    },
  });

  return { addFn, isError, responseData };
};
const useChangeCartItemNumber = (
  successCallback?: (data: CommonResponse) => void,
  failCallback?: (data: CommonResponse) => void
) => {
  const queryClient = useQueryClient();
  const {
    mutate: changeFn,
    isError,
    isPending,
    data: responseData,
  } = useMutation({
    mutationFn: changeCartItemNumber,
    onSuccess: (data) => {
      if (data && data.ok) {
        console.log("changeCartItemNumber success");
        successCallback && successCallback(data);
        return;
      } else {
        console.log("changeCartItemNumber failed");
        failCallback && failCallback(data);
      }
      queryClient.invalidateQueries({ queryKey: ["cart", "all"] });
    },
  });

  return { changeFn, isError, isPending, responseData };
};
export { useCart, useAddCartItem, useChangeCartItemNumber, useDeleteCartItem };
export type { CartItem };
