export function createId(...parts: [string, ...string[]]): string {
  return parts.join('-').toLowerCase();
}
