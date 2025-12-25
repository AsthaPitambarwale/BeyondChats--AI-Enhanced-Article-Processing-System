import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import ArticleCard from "../components/ArticleCard";
import FilterBar from "../components/FilterBar";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArticles(isUpdated)
      .then(setArticles)
      .finally(() => setLoading(false));
  }, [isUpdated]);

  return (
    <div className="app-container">
      <h2>Articles</h2>

      <div className="filter-bar">
        <button
          className={`filter-btn ${isUpdated === false ? "active" : ""}`}
          onClick={() => setIsUpdated(false)}
        >
          Pending
        </button>

        <button
          className={`filter-btn ${isUpdated === true ? "active" : ""}`}
          onClick={() => setIsUpdated(true)}
        >
          Processed
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {!loading && articles.length === 0 && (
        <p className="empty">No articles found.</p>
      )}

      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
