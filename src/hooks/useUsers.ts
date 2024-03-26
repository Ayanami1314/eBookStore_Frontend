import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { CommonResponse } from "../services/type";
import mockUsers from "../mock/admin/mockUsers";
interface User {
  id: number;
  nickname: string;
  balance: number;
}
type UserToAdmin = User & { totalcost: number; ban?: boolean };
// TODO: implement below two with admin api
// const fetchUsers = () => {
//   const apiClientInstance = new apiClient<User>("/admin/users");
//   return apiClientInstance.getAll();
// };
const fetchSingleUser = (id: number) => {
  const apiClientInstance = new apiClient<User>(`/admin/user/${id}`);
  return apiClientInstance.get();
};
const fetchMe = () => {
  const apiClientInstance = new apiClient<User>(`/user/me`);
  return apiClientInstance.get();
};
const changeBan = (id: number) => {
  const apiClientInstance = new apiClient<CommonResponse>(
    `/admin/user/changeban/${id}`
  );
  return apiClientInstance.put({});
};
const useUsers = () => {
  // const { data, isError, isLoading } = useQuery<User[], Error>({
  //   queryKey: ["users"],
  //   queryFn: fetchUsers,
  // });
  // return { data, isError, isLoading };
  // HINT: fake users data now
  const data = mockUsers as UserToAdmin[];
  return { data: data, isError: false, isLoading: false };
};
const useSingleUser = (id: number) => {
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
export { useUsers, useSingleUser, useMe, changeBan, changePassword };
export type { User, UserToAdmin };
