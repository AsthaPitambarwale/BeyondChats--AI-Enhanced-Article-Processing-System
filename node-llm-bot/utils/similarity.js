import natural from "natural";

export function similarity(a, b) {
  const tfidf = new natural.TfIdf();
  tfidf.addDocument(a);
  tfidf.addDocument(b);

  let score = 0;
  tfidf.tfidfs(b, (_, measure) => (score = measure));
  return score;
}
