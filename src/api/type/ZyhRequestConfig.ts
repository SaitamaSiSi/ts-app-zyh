interface BaseRequestConfig {
  baseURL?: string;
}

interface ZyhRequestConfig extends BaseRequestConfig {
  responseType?: ResponseType;
  authorization?: string;
}

interface ZyhResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  request?: any;
}

export type {
  ZyhResponse,
  ZyhRequestConfig,
  BaseRequestConfig,
};