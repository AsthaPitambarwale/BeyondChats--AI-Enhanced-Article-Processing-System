import OpenAI from "openai";
import { chunkText } from "../utils/chunk.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function rewriteWithAI(original, examples) {
  try {
    const chunks = chunkText(original);
    const rewrittenChunks = [];

    for (const chunk of chunks) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a professional technical blog editor.
Rewrite clearly, preserve facts, no hallucinations.
`,
          },
          {
            role: "user",
            content: `
ORIGINAL:
${chunk}

REFERENCE STYLE:
${examples}
`,
          },
        ],
      });

      rewrittenChunks.push(completion.choices[0].message.content);
    }

    return {
      content: rewrittenChunks.join("\n\n"),
      source: "openai",
    };
  } catch (err) {
    console.warn("⚠️ OpenAI unavailable. Using deterministic fallback.");

    return {
      content: generateFallback(original),
      source: "fallback",
    };
  }
}

function generateFallback(original) {
  return `
## ${original.split("\n")[0] || "BeyondChats Overview"}

BeyondChats is an AI-powered conversational platform designed to help businesses
automate and scale customer interactions using intelligent virtual agents.

### What BeyondChats Offers
- Automated customer conversations
- AI-driven knowledge responses
- Scalable support workflows
- Easy system integrations

This article was enhanced using a system fallback strategy.
`.trim();
}
