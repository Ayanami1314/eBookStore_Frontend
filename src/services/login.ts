import useAuthStore from "../auth/useAuthStore";
import apiClient from "./api-client";
interface LoginResponse {
  auth_token: string;
  isUser: boolean;
  isAdmin: boolean;
}
interface LoginParams {
  username: string;
  password: string;
}

const LoginFromBackend = (params: LoginParams) => {
  const loginClient = new apiClient<LoginResponse>("/login");
  const setAuth = useAuthStore((s) => s.setAuth);
  const res = loginClient.login((auth: LoginResponse) => {
    setAuth({ ...auth, try_invalid_op: false });
    return auth;
  }, params);

  return res;
};
export default LoginFromBackend;
export type { LoginResponse, LoginParams };
