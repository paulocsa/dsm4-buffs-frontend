export const API_CONNECTION_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_CONNECTION_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
      throw new Error("Unauthorized");
    }
    const errorText = await response.text();
    throw new Error(`Erro ${response.status}: ${errorText}`);
  }

  return response.json();
}
