import { z } from 'zod';

const schema = z.object({
  data: z.any(),
  code: z.number(),
  message: z.string(),
});
type ExtraConfig = {
  maxRetries?: number;
};

interface RequestJSONExtra extends ExtraConfig {
  type?: undefined;
}

interface RequestStreamExtra extends ExtraConfig {
  type: 'stream';
}

type RequestExtraConfig = RequestJSONExtra | RequestStreamExtra;

export function request<T = Uint8Array>(
  url: string,
  requestInit: RequestInit | undefined,
  extraConfig: RequestStreamExtra,
): Promise<ReadableStream<T> | null>;

export function request<T>(url: string, requestInit?: RequestInit, extraConfig?: RequestJSONExtra): Promise<T>;

export async function request<T>(url: string, requestInit: RequestInit = {}, extraConfig: RequestExtraConfig = {}) {
  const {
    method = 'GET',
    headers = {
      'Content-Type': 'application/json',
    },
    ...rest
  } = requestInit;

  const { type } = extraConfig;
  const response = await fetch(url, {
    method,
    headers,
    ...rest,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (type === 'stream') {
    return response.body;
  }

  const json = await response.json();
  const { success, data } = schema.safeParse(json);
  if (!success) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return data.data as T;
}
