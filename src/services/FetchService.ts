import { FetchDataOptions, ApiResponse } from "@/types/baseService";
import BaseService from "./BaseService";

const FetchService = async <T>(
  url: string,
  options: FetchDataOptions = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await BaseService<T>(url, options);
    return response;
  } catch (error) {
    throw error;
  }
};

export default FetchService;
