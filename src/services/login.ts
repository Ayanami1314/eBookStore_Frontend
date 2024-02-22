import axios from "axios";
import { PREFIX } from "../common/common";
import { originalResponse } from "../common/common";
const login = (
  username: string,
  password: string
): Promise<originalResponse> => {
  const apiClientInstance = axios.create({
    baseURL: PREFIX,
    withCredentials: true,
  });
  const config = {
    url: "/login",
    method: "POST",
  };
  console.log(PREFIX, config);
  const res = apiClientInstance
    .post(config.url, { username: username, password: password })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((e) => {
      console.log(e.message);
      return {
        ok: false,
        message: "登录失败！",
      } as originalResponse;
    });
  return res as Promise<originalResponse>;
};
export default login;
