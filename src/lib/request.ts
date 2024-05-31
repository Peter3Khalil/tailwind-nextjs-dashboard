interface RequestProps<U> extends RequestInit {
  url: string;
  data?: U;
}
export const request = async <TData = unknown, TResponse = TData>({
  url,
  method = 'GET',
  headers,
  data,
  ...props
}: RequestProps<TData>): Promise<TResponse> => {
  const isClient = typeof window !== 'undefined';
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${isClient ? localStorage.getItem('token') : ''}`,
      ...(headers || {}),
    },
    body: data ? JSON.stringify(data) : undefined,
    ...props,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
