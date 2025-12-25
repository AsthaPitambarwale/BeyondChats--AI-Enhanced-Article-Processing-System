const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

export async function fetchArticles(isUpdated) {
  const res = await fetch(
    `${API_BASE}/articles?updated=${isUpdated}`
  );
  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
}

export async function fetchArticleById(id) {
  const res = await fetch(`${API_BASE}/articles/${id}`);
  if (!res.ok) throw new Error("Failed to fetch article");
  return res.json();
}
