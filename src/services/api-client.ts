import axios, { AxiosRequestConfig } from "axios";
import { PREFIX } from "../common/common";
import { RequestProps } from "./type";
const apiClientInstance = axios.create({
  baseURL: PREFIX,
  withCredentials: true,
});

class apiClient<T> {
  // T: return
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll = (params?: unknown) => {
    const config: AxiosRequestConfig = {
      url: this.endpoint,
      method: "GET",
      params: params,
    };
    const data = apiClientInstance
      .get<T[]>(this.endpoint, config)
      .then((res) => res.data);
    return data;
  };

  get = (params?: unknown) => {
    const config: AxiosRequestConfig = {
      url: this.endpoint,
      method: "GET",
      params: params,
    };

    const data = apiClientInstance
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
    };
    const response = apiClientInstance
      .post<T>(this.endpoint, data, config)
      .then((res) => res.data);
    return response;
  };

  put = ({ data, params }: RequestProps) => {
    const config: AxiosRequestConfig = {
      url: this.endpoint,
      method: "PUT",
      params: params,
    };
    const response = apiClientInstance
      .put<T>(this.endpoint, data, config)
      .then((res) => res.data);
    return response;
  };
  delete = (params?: unknown) => {
    const config: AxiosRequestConfig = {
      url: this.endpoint,
      method: "DELETE",
      params: params,
    };
    const response = apiClientInstance
      .delete(this.endpoint, config)
      .then((res) => res.data);
    return response;
  };
}

export default apiClient;
