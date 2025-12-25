import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <h3>{article.title}</h3>

      <p>{article.content.slice(0, 120)}...</p>

      <div className="article-status">
        Status: {article.is_updated ? "✅ Processed" : "⏳ Pending"}
      </div>

      <Link to={`/articles/${article.id}`}>
        View Details →
      </Link>
    </div>
  );
}
