import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
interface User {
  id: string;
  nickname: string;
  balance: string;
}
const fetchUsers = () => {
  const apiClientInstance = new apiClient<User>("/users");
  return apiClientInstance.getAll();
};
const fetchSingleUser = (id: string) => {
  const apiClientInstance = new apiClient<User>(`/user`);
  return apiClientInstance.getById(id);
};
const useUsers = () => {
  const { data, isError, isLoading } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  return { data, isError, isLoading };
};
const useSingleUser = (id: string) => {
  const { data, isError, isLoading } = useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: () => fetchSingleUser(id),
  });
  return { data, isError, isLoading };
};

export { useUsers, useSingleUser };
export type { User };
