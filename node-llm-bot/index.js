import "dotenv/config";
import { fetchLatestOriginal, publishAIArticle } from "./services/laravelApi.js";
import { searchReferences } from "./services/search.js";
import { scrapeArticle } from "./services/scraper.js";
import { rewriteWithAI } from "./services/llm.js";
import { similarity } from "./utils/similarity.js";

async function runBot() {
  console.log("🤖 LLM Bot started");

  const article = await fetchLatestOriginal();
  if (!article) {
    console.log("No new articles to process");
    return;
  }

  console.log("Fetched 1 article");
  console.log("Processing article ID", article.id);

  const results = await searchReferences(article.title);

  const examples = [];
  for (const r of results) {
    try {
      examples.push(await scrapeArticle(r.link));
    } catch {}
  }

  const { content } = await rewriteWithAI(
    article.content,
    examples.join("\n")
  );

  // Similarity check (log only)
  const score = similarity(article.content, content);
  if (score > 0.85) {
    console.log("⚠️ High similarity detected — continuing");
  }

  // 🔴 ALWAYS UPDATE STATUS
  await publishAIArticle(
    article,
    content,
    results.map(r => r.link)
  );

  console.log("Article updated successfully");
}

runBot().catch(err => console.error("Bot error:", err.message));
