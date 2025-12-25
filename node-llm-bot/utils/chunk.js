export function chunkText(text, size = 2000) {
  return text.match(new RegExp(`(.|\\n){1,${size}}`, "g")) || [];
}
