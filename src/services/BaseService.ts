import { BaseServiceOptions, ApiResponse } from "@/types/baseService";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const REQUEST_HEADER_AUTH_KEY = "Authorization";
const TOKEN_TYPE = "Bearer ";

const getAuthToken = (): string => {
  // Logic to retrieve the auth token from local storage or Redux store
  // const token = localStorage.getItem("authToken") || "";
  return "";
};

const BaseService = async <T>(
  url: string,
  options: BaseServiceOptions = {}
): Promise<ApiResponse<T>> => {
  const authToken = getAuthToken();
  const headers = new Headers({
    "Content-Type": "application/json",
    ...options.headers,
  });

  if (authToken) {
    headers.set(REQUEST_HEADER_AUTH_KEY, `${TOKEN_TYPE}${authToken}`);
  }

  const requestOptions: RequestInit = {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : null,
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, requestOptions);

    // const data = await response // Always parse the JSON to get the response or error message

    if (!response.ok) {
      // Handle HTTP errors
      return Promise.reject({ ...response });
    }

    const data = await response.json();

    return { data }; // Assuming success
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default BaseService;
