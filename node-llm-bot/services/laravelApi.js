import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export async function fetchLatestOriginal() {
  const res = await axios.get(`${API}/articles?updated=false`);
  return res.data.length ? res.data[0] : null;
}

export async function publishAIArticle(article, content, sources) {
  await axios.put(`${API}/articles/${article.id}`, {
    content,
    sources,
    is_updated: true, // 🔴 FORCE UPDATE
  });
}
