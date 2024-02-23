import { CommonResponse } from "./type";
import apiClient from "./api-client";

const login = async (username: string, password: string) => {
  const apiClientInstance = new apiClient<CommonResponse>("/login");
  const res = await apiClientInstance.post({
    data: { username: username, password: password },
  });
  console.log("登录结果：" + res);
  return res;
};

export default login;
