import ApiService from "./ApiService";

export async function apiUpdateUser<T>() {
  return ApiService.fetchData<T>({
    url: "/project/scrum-board/boards",
    method: "post",
  });
}
