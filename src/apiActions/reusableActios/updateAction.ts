// src/apiActions/reusableActions/update.action.ts

type UpdateOptions<T> = {
  url: string;
  data: T;
  headers?: Record<string, string>;
  method?: "PUT" | "PATCH"; // allow either
};

export async function updateRequest<T, R>({
  url,
  data,
  headers = {},
  method = "PUT",
}: UpdateOptions<T>): Promise<R> {
  console.log(`the url is---> ${url} [${method}]`);
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Update request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return (await response.json()) as R;
  } catch (error) {
    console.error("UPDATE request error:", error);
    throw error;
  }
}


