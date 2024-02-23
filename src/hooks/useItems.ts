import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
interface Item {
  id: string;
}
class ItemClass<T extends Item> {
  // 假设后端API这样设计 /book/:id, 和 /books
  endpoint: string;
  multi_endpoint: string; // 复数url, 例如 "books"
  constructor(endpoint: string, multi_endpoint: string) {
    this.endpoint = endpoint;
    this.multi_endpoint = multi_endpoint;
  }
  fetchItems = () => {
    const apiClientInstance = new apiClient<T>(this.multi_endpoint);
    return apiClientInstance.getAllItems();
  };
  fetchSingleItem = (id: string) => {
    const apiClientInstance = new apiClient<T>(this.endpoint);
    return apiClientInstance.getById(id);
  };
  useItems = () => {
    const { data, isError, isLoading } = useQuery<T[], Error>({
      queryKey: [this.multi_endpoint],
      queryFn: this.fetchItems,
    });
    return { data, isError, isLoading };
  };
  useSingleItem = (id: string) => {
    const { data, isError, isLoading } = useQuery<T, Error>({
      queryKey: ["book", id],
      queryFn: () => this.fetchSingleItem(id),
    });
    return { data, isError, isLoading };
  };
}

export default ItemClass;
