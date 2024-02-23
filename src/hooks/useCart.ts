import apiClient from "../services/api-client";
import { Book } from "./useBooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// TODO: refactor with react Query
type CartItem = { id: number; book: Book; number: number };

const fetchCart = () => {
  const CartApi = new apiClient<CartItem>("/cart");
  return CartApi.getAll();
};

const deleteCartItem = (id: number) => {
  const CartApi = new apiClient<CartItem>("/cart");
  const cart = CartApi.deleteById(id, id); // params: id
  return cart;
};
interface changeCartItemNumberProps {
  id: string;
  number: number;
}
const changeCartItemNumber = ({ id, number }: changeCartItemNumberProps) => {
  const CartApi = new apiClient<CartItem>("/cart");
  const cart = CartApi.updateById(id, {} as CartItem, {
    id: id,
    number: number,
  });
  return cart;
};

const addCartItem = (bookid: number) => {
  const CartApi = new apiClient<{ id: number }>("/cart");
  const cart = CartApi.put(undefined, {
    bookId: bookid,
  });
  console.log(cart);
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
    },
  });

  return { addFn, isError, responseData };
};
const useChangeCartItemNumber = () => {
  const queryClient = useQueryClient();
  const {
    mutate: changeFn,
    isError,
    data: responseData,
  } = useMutation({
    mutationFn: changeCartItemNumber,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", "all"] });
    },
  });

  return { changeFn, isError, responseData };
};
export { useCart, useAddCartItem, useChangeCartItemNumber, useDeleteCartItem };
export type { CartItem };
