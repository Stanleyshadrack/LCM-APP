// src/utils/requestWrapper.ts
export interface Meta {
  requestId: string;
  source: string;
  timestamp: number;
}

export interface WrappedRequest<T = any> {
  meta: Meta;
  payload: T;
}

/**
 * Wraps payload with meta structure
 * @param payload - Any data you want to attach
 * @param source - The source identifier (e.g. "ADD_TENANTS")
 */
export function createRequest<T = any>(
  payload: T,
  source: string
): WrappedRequest<T> {
  return {
    meta: {
      requestId: Date.now().toString(), // you can replace with uuid if needed
      source,
      timestamp: Date.now(),
    },
    payload,
  };
}
