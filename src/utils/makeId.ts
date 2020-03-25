export function makeId(...parts: [string, string, ...string[]]): string {
  return parts.join('-').toLowerCase();
}
