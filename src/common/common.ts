// vite提供环境变量的方式: import.meta.env
export const BASEURL =
  import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";
export const PREFIX = `${BASEURL}/api`;
export const GraphQL_PREFIX = `${BASEURL}/graphql`;
export const API_DOCS_URL = `${BASEURL}/api-docs`;
export const IMAGE_PREFIX = `${BASEURL}/images`;
export const DUMMY_RESPONSE = {
  ok: false,
  message: "网络错误！",
};
export const SOCK_WS_CONN_URL = `${BASEURL}/ws`;
export const WS_BASEURL = import.meta.env.VITE_WS_BACKEND_URL ?? "ws://localhost:8080";
export const WS_SEND_PRIFIX = `${WS_BASEURL}/app`
export const WS_RECEIVE_PRIFIX = `${WS_BASEURL}/topic`
export type CommonResponse<T> = {
  data: T;
  message: string;
  ok: boolean;
}