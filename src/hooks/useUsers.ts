import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { CommonResponse } from "../services/type";
interface User {
  id: string;
  nickname: string;
  balance: string;
}
// TODO: implement below two with admin api
const fetchUsers = () => {
  const apiClientInstance = new apiClient<User>("/admin/users");
  return apiClientInstance.getAll();
};
const fetchSingleUser = (id: string) => {
  const apiClientInstance = new apiClient<User>(`/admin/user/${id}`);
  return apiClientInstance.get({ id: id });
};
const fetchMe = () => {
  const apiClientInstance = new apiClient<User>(`/user/me`);
  return apiClientInstance.get();
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
const useMe = () => {
  const { data, isError, isLoading } = useQuery<User, Error>({
    queryKey: ["user", "me"],
    queryFn: () => fetchMe(),
  });
  return { data, isError, isLoading };
};
const changePassword = (password: string) => {
  const apiClientInstance = new apiClient<CommonResponse>(`/user/me/password`);
  return apiClientInstance.put({ data: { password: password } });
};
export { useUsers, useSingleUser, useMe, changePassword };
export type { User };
