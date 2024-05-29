import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { CommonResponse } from "../services/type";
// import mockUsers from "../mock/admin/mockUsers";

interface User {
  id: number;
  nickname: string;
  balance: number;
  status?: "normal" | "ban";
  headImg?: string;
  city?: string;
  phone?: string;
  email?: string;
  address?: string;
  firstName?: string;
  lastName?: string;
  notes?: string;
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
const changeBan = (id: number, ban: boolean) => {
  const apiClientInstance = new apiClient<CommonResponse>(
    `/admin/user/changeban/${id}`
  );
  return apiClientInstance.put({ params: { ban: ban } });
};
const fetchUsers = () => {
  const apiClientInstance = new apiClient<UserToAdmin>("/admin/users");
  return apiClientInstance.getAll();
};
const useAllUsers = () => {
  const { data, isError, isLoading } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  return { data, isError, isLoading };
  // HINT: fake users data now
  // const data = mockUsers as UserToAdmin[];
  // return { data: data, isError: false, isLoading: false };
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
const changePassword = (oldPassword: string, newPassword: string) => {
  console.log(`changepassword ${oldPassword}, ${newPassword}`);
  const apiClientInstance = new apiClient<CommonResponse>(`/user/me/password`);
  return apiClientInstance.put({
    data: { oldPassword: oldPassword, newPassword: newPassword },
  });
};
export interface registerUserRequest {
  username: string;
  password: string;
  email: string;
}
const registerNewUser = (req: registerUserRequest) => {
  const apiClientInstance = new apiClient<CommonResponse>(`/register`);
  return apiClientInstance.post({ data: req });
};
export interface changeUserInfoProps {
  phone?: string;
  email?: string;
  address?: string;
  avatar?: string;
  notes?: string;
}
const changeUserInfo = (req: changeUserInfoProps) => {
  const apiClientInstance = new apiClient<CommonResponse>(`/user/me/info`);
  return apiClientInstance.put({ data: req });
};
export {
  useAllUsers,
  useSingleUser,
  useMe,
  changeBan,
  changePassword,
  registerNewUser,
  changeUserInfo,
};
export type { User, UserToAdmin };
