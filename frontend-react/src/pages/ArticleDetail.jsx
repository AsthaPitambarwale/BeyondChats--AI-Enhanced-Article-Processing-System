import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById } from "../api";

export default function ArticleDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        fetchArticleById(id).then(setArticle);
    }, [id]);

    if (!article) return <p className="loading">Loading article...</p>;

    return (
        <div className="app-container">
            <Link className="back-link" to="/">← Back to Articles</Link>

            <div className="article-detail">
                <h1 className="article-title">{article.title}</h1>

                <div className="article-content">
                    {article.content}
                </div>

                <div className="article-meta">
                    Status:{" "}
                    <strong>
                        {article.is_updated ? "Processed" : "Pending"}
                    </strong>
                </div>

                {article.references && article.references.length > 0 && (
                    <div className="references">
                        <h3>References</h3>
                        <ul>
                            {article.references.map((ref, i) => (
                                <li key={i}>
                                    <a href={ref} target="_blank">
                                        {ref}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
