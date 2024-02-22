import apiClient from "../services/api-client";
import { Book } from "./useBooks";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// TODO: refactor with react Query
type CartItem = { id: string; book: Book; number: number };

const fetchCart = () => {
  const CartApi = new apiClient<CartItem>("/cart");
  const cart = CartApi.getAll();
  return cart;
};

const deleteCartItem = (id: string) => {
  const CartApi = new apiClient<CartItem>("/cart");
  const cart = CartApi.deleteById(id, { id: id });
  return cart;
};
const changeCartItemNumber = (id: string, number: number) => {
  const CartApi = new apiClient<CartItem>("/cart");
  const cart = CartApi.updateById(id, {} as CartItem, {
    id: id,
    number: number,
  });
  return cart;
};

const addCartItem = (bookid: string) => {
  const CartApi = new apiClient<CartItem>("/cart");
  const cart = CartApi.post({} as CartItem, { id: bookid });
  return cart;
};

const useCart = () => {
  return { fetchCart, deleteCartItem, changeCartItemNumber, addCartItem };
};
export default useCart;
