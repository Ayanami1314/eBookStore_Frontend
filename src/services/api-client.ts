import axios, { AxiosRequestConfig } from "axios";
import { BASEURL } from "../common/common";

const apiClientInstance = axios.create({
  baseURL: BASEURL,
});

class apiClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll = (params?: any) => {
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
  getById = (id: string, params?: any) => {
    const config: AxiosRequestConfig = {
      url: `${this.endpoint}/${id}`,
      method: "GET",
      params: params,
    };
    if (!this.endpoint || !id) {
      console.log(this.endpoint, id);
      throw new Error("endpoint or id is null");
    }
    const data = apiClientInstance
      .get<T>(config.url as string, config)
      .then((res) => res.data);
    return data;
  };
  post = (data: T, params?: any) => {
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
  put = (data: T, params?: any) => {
    const config: AxiosRequestConfig = {
      url: this.endpoint,
      method: "PUT",
      params: params,
    };
    const res = apiClientInstance.put<T>(this.endpoint, data, config);
    return res;
  };
  delete = (params?: any) => {
    const config: AxiosRequestConfig = {
      url: this.endpoint,
      method: "DELETE",
      params: params,
    };
    const data = apiClientInstance
      .delete<T>(this.endpoint, config)
      .then((res) => res.data);
    return data;
  };
  deleteById = (id: string, params?: any) => {
    const config: AxiosRequestConfig = {
      url: `${this.endpoint}/${id}`,
      method: "DELETE",
      params: params,
    };
    if (!this.endpoint || !id) {
      console.log(this.endpoint, id);
      throw new Error("endpoint or id is null");
    }
    const data = apiClientInstance
      .delete<T>(config.url as string, config)
      .then((res) => res.data);
    return data;
  };
  updateById = (id: string, data: T, params?: any) => {
    const config: AxiosRequestConfig = {
      url: `${this.endpoint}/${id}`,
      method: "PUT",
      data: data,
      params: params,
    };
    if (!this.endpoint || !id) {
      console.log(this.endpoint, id);
      throw new Error("endpoint or id is null");
    }
    const response = apiClientInstance
      .put<T>(config.url as string, data, config)
      .then((res) => res.data);
    console.log(response);
    return response;
  };
}

export default apiClient;
