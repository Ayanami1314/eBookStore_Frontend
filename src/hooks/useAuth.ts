import { useQuery } from "@tanstack/react-query";
import LoginFromBackend, {
  LoginParams,
  LoginResponse,
} from "../services/login";
const TryLogin = (params: LoginParams) => {
  return LoginFromBackend(params);
};
// the hook should only be used in login form
const useAuth = (params: LoginParams) => {
  const { data, isLoading, isError } = useQuery<LoginResponse, Error>({
    queryKey: ["auth"],
    queryFn: () => TryLogin(params),
  });
  // 实际的validation是在后端做的，如果token不对，即使被改了，也请求不到数据
  // 当访问private route的时候，才向后端请求特定数据（需要token）
  // 所以这里简单判断token存在性即可，即使用户篡改，也看不到数据，只能看到页面
  return { data, isLoading, isError };
};

export default useAuth;
