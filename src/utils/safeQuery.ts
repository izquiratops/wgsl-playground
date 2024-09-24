export default function safeQuery<T>(query: string): T {
  const result = document.querySelector(query);

  if (result === null) {
    throw new Error(`Element with query ${query} not found`);
  }

  return result as T;
}