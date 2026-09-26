/**
 * Public asset helper for GitHub Pages (`/tafseel-website`) static export.
 * Prefixes root paths in production; leaves paths unchanged in local `next dev`.
 */
export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? "/tafseel-website" : "");

export function asset(path: string): string {
  if (!path) return BASE_PATH || "/";
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  // Avoid double-prefix if caller already included basePath
  if (BASE_PATH && normalized.startsWith(`${BASE_PATH}/`)) return normalized;
  return `${BASE_PATH}${normalized}`;
}

/** Extension variants for case-sensitive hosts (GitHub Pages / Linux) */
const EXT_VARIANTS = [".jpeg", ".jpg", ".JPG", ".JPEG", ".png", ".PNG", ".webp", ".WEBP"];

/**
 * Build candidate URLs for a public media path, trying common extension casings.
 * Input may be `/images/t1.jpeg` or `t1.jpeg` (assumed under /images/).
 */
export function mediaCandidates(path: string): string[] {
  let normalized = path.trim();
  if (!normalized.startsWith("/") && !/^https?:\/\//i.test(normalized)) {
    normalized = `/images/${normalized}`;
  }
  if (/^https?:\/\//i.test(normalized)) return [normalized];

  const match = normalized.match(/^(.*?)(\.[A-Za-z0-9]+)?$/);
  const base = match?.[1] ?? normalized;
  const seen = new Set<string>();
  const out: string[] = [];

  const push = (p: string) => {
    const url = asset(p);
    if (!seen.has(url)) {
      seen.add(url);
      out.push(url);
    }
  };

  if (match?.[2]) push(`${base}${match[2]}`);
  for (const ext of EXT_VARIANTS) push(`${base}${ext}`);

  return out;
}
