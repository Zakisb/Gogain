export interface BaseServiceOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}

export interface FetchDataOptions extends BaseServiceOptions {}

export interface ApiResponse<T> {
  data: T;
}
