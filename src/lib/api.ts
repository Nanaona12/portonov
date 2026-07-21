export async function apiRequest<T = any>(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('PORTONOV_TOKEN');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`/api/${path}`, {
    ...options,
    headers,
  });

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.error || 'API request failed');
  }

  return body as T;
}
