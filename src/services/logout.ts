import apiClient from "./api-client";
import { CommonResponse } from "./type";

const logout = async () => {
  const apiClientInstance = new apiClient<CommonResponse>("/logout");
  const res = await apiClientInstance.put({});
  console.log("登出结果：" + res.message);
  return res;
};

export default logout;
