import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { PREFIX, GraphQL_PREFIX } from "../common/common";
import { RequestProps } from "./type";
const apiClientInstance = axios.create({
  baseURL: PREFIX,
  withCredentials: true,
});
const graphqlClientInstance = axios.create({
  baseURL: GraphQL_PREFIX,
  withCredentials: true,
});

class apiClient<T> {
  // T: return
  endpoint: string;
  instance: AxiosInstance;
  constructor(endpoint: string, useGraphQL: boolean = false) {
    this.endpoint = endpoint;
    this.instance = useGraphQL? graphqlClientInstance : apiClientInstance;
  }
  getAll = (params?: unknown) => {
    const config: AxiosRequestConfig = {
      url: this.endpoint,
      method: "GET",
      params: params,
      withCredentials: true,
    };
    const data = this.instance
      .get<T[]>(this.endpoint, config)
      .then((res) => res.data);
    return data;
  };

  get = (params?: unknown) => {
    const config: AxiosRequestConfig = {
      url: this.endpoint,
      method: "GET",
      params: params,
      withCredentials: true,
    };

    const data = this.instance
      .get<T>(config.url as string, config)
      .then((res) => res.data);
    return data;
  };

  post = ({ data, params }: RequestProps) => {
    const config: AxiosRequestConfig = {
      url: this.endpoint,
      method: "POST",
      data: data,
      params: params,
      withCredentials: true,
    };
    const response = this.instance
      .post<T>(this.endpoint, data, config)
      .then((res) => res.data);
    return response;
  };

  put = ({ data, params }: RequestProps) => {
    const config: AxiosRequestConfig = {
      url: this.endpoint,
      method: "PUT",
      params: params,
      withCredentials: true,
    };
    const response = this.instance
      .put<T>(this.endpoint, data, config)
      .then((res) => res.data);
    return response;
  };
  delete = (params?: unknown) => {
    const config: AxiosRequestConfig = {
      url: this.endpoint,
      method: "DELETE",
      params: params,
      withCredentials: true,
    };
    const response = this.instance
      .delete(this.endpoint, config)
      .then((res) => res.data);
    return response;
  };
}

export default apiClient;
