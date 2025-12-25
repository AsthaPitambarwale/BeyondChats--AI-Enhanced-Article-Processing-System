import axios from "axios";

export async function searchReferences(query) {
  const { data } = await axios.get("https://serpapi.com/search", {
    params: {
      q: query,
      api_key: process.env.SERP_API_KEY,
      num: 3,
    },
  });

  return data.organic_results.slice(0, 3);
}
