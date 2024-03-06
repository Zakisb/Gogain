const BaseService = async (url: string, options: any = {}) => {
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    // Add your token here
    Authorization: "Bearer your-token",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers, // allows per-request overrides
    },
  });

  if (!response.ok) {
    throw new Error(`Fetch request failed: ${response.status}`);
  }
  return response.json();
};

export default BaseService;
