import BaseService from "./BaseService";

const ApiService = {
  fetchData<Response = unknown, Request = Record<string, unknown>>(
    url: string,
    options: RequestInit = {}
  ) {
    return new Promise<Response>((resolve, reject) => {
      BaseService(url, options)
        .then((response: Response) => {
          resolve(response);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  },
};

export default ApiService;
