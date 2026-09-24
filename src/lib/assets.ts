/**
 * Public asset helper for GitHub Pages (`/tafseel-website`) static export.
 * Prefixes root paths in production; leaves paths unchanged in local `next dev`.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path) return BASE_PATH || "/";
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
