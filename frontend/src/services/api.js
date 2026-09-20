const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getMenu() {
  const response = await fetch(`${API_BASE_URL}/menu`);

  if (!response.ok) {
    throw new Error("Failed to fetch menu");
  }

  return response.json();
}