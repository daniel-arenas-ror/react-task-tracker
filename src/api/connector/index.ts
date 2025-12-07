import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import axiosConf from './../axiosConf';

export class Connector {
  private httpClient: AxiosInstance;
  
  /**
   * Helper method to wrap an Axios request in a standard Promise.
   * Since axiosConf uses an interceptor to return response.data, 
   * the Promise resolves to the response data (or `any` data type).
   * @param method The Axios method to call (e.g., 'get', 'post').
   * @param url The API endpoint URL.
   * @param data The request body (for post, put, patch).
   * @param config Optional Axios request configuration.
   * @returns A Promise that resolves with the response data or rejects with the error.
   */
  private request(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<any> {

    const args: (string | any | AxiosRequestConfig)[] = [url];
    if (method === 'get' || method === 'delete') {
      args.push(data || config);
    } else {
      args.push(data, config);
    }

    return new Promise((resolve, reject) => {
      (this.httpClient[method] as any)(...args)
        .then((response: any) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }

  constructor(http: AxiosInstance) {
    this.httpClient = http;
  }

  // --- Public HTTP Methods ---

get(url: string, config: AxiosRequestConfig = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(url, config)
        .then((response: any) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }

  post(url: string, body: any = {}, config: AxiosRequestConfig = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(url, body, config)
        .then((response: any) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }

  put(url: string, body: any, config: AxiosRequestConfig = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .put(url, body, config)
        .then((response: any) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }

  patch(url: string, body: any, config: AxiosRequestConfig = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .patch(url, body, config)
        .then((response: any) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }

  delete(url: string, config: AxiosRequestConfig = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(url, config)
        .then((response: any) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }
}

export default new Connector(axiosConf)
