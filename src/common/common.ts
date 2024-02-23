// vite提供环境变量的方式: import.meta.env
export const BASEURL =
  import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";
export const PREFIX = `${BASEURL}/api`;
export const API_DOCS_URL = `${BASEURL}/api-docs`;
export const IMAGE_PREFIX = `${BASEURL}/images`;
export const DUMMY_RESPONSE = {
  ok: false,
  message: "网络错误！",
};
