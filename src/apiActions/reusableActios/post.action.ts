// "use server";

type PostOptions<T> = {
  url: string;
  data: T;
  headers?: Record<string, string>;
};

export async function postRequest<T, R>({
  url,
  data,
  headers = {},
}: PostOptions<T>): Promise<R> {
    console.log("the url is--->", url);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as R;
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
}
