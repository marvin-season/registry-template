export class RequestClient {
  constructor(private readonly baseUrl: string) {}
  get<T>(url: string) {
    return request<T>(`${this.baseUrl}${url}`);
  }
  post<T>(url: string, data: any) {
    return request<T>(`${this.baseUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  put<T>(url: string, data: any) {
    return request<T>(`${this.baseUrl}${url}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
  delete<T>(url: string) {
    return request<T>(`${this.baseUrl}${url}`, {
      method: 'DELETE',
    });
  }
}

export const requestClient = new RequestClient('https://api.restful-api.dev');

export async function request<T>(url: string, requestInit: RequestInit = {}) {
  const {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    ...rest
  } = requestInit;

  const response = await fetch(url, {
    headers,
    ...rest,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const json = await response.json();
  return json as T;
}
