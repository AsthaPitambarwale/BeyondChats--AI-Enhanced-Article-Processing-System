import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeArticle(url) {
  const html = (await axios.get(url)).data;
  const $ = cheerio.load(html);

  return $("article")
    .text()
    .replace(/\s+/g, " ")
    .slice(0, 5000);
}
