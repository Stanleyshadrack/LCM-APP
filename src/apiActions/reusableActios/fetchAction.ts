// src/apiActions/reusableActions/apiRequest.ts

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestOptions<T> = {
  url: string;
  method?: HttpMethod; // default POST
  data?: T;            // body payload (ignored for GET/DELETE)
  headers?: Record<string, string>;
};

export async function apiRequest<T = any, R = any>({
  url,
  method = "POST",
  data,
  headers = {},
}: RequestOptions<T>): Promise<R> {
  console.log(`[${method}] → ${url}`);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
        
      },
      cache:"no-cache",
      body: method === "GET" || method === "DELETE" ? undefined : JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    // return JSON if present, otherwise empty object
    try {
      return (await response.json()) as R;
    } catch {
      return {} as R;
    }
  } catch (error) {
    console.error(`API request error [${method} ${url}]:`, error);
    throw error;
  }
}
