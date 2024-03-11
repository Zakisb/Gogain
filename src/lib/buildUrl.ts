export function buildURL(
  endpoint: string,
  pathParams: string[] = [],
  queryParams: Record<string, string> = {}
): string {
  const url = [endpoint, ...pathParams].join("/");
  const query = new URLSearchParams(queryParams).toString();
  return query ? `${url}?${query}` : url;
}
