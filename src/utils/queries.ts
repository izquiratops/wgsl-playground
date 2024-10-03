export function $<T extends Element>(query: string): T {
  const result = document.querySelector(query);

  if (result === null) {
    throw new Error(`Element with query ${query} not found`);
  }

  return result as T;
}

export function $$<T extends Element>(query: string): NodeListOf<T> {
  return document.querySelectorAll<T>(query);
}
