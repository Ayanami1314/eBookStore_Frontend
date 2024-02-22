import axios from "axios";
import { BASEURL } from "../common/common";
const login = (username: string, password: string) => {
  const apiClientInstance = axios.create({
    baseURL: BASEURL,
  });
  const config = {
    url: "/login",
    method: "POST",
    data: {
      username: username,
      password: password,
    },
  };
  apiClientInstance.post(config.url, config.data).catch((e) => {
    console.log(e.message);
    return {
      ok: false,
      message: "登录失败！",
    };
  });
};
export default login;
