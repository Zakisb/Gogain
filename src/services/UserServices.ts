import FetchService from "./FetchService";
import { ApiResponse } from "@/types/baseService";

export const apiGetNotificationCount = async (): Promise<
  ApiResponse<{ count: number }>
> => {
  return FetchService("/notification/count", { method: "GET" });
};
