/**
 * Public asset helper for GitHub Pages (`/tafseel-website`) static export.
 * Always produces absolute-from-site-root URLs including basePath.
 */
export const BASE_PATH = (
  process.env.NEXT_PUBLIC_BASE_PATH ||
  "/tafseel-website"
).replace(/\/$/, "");

/** Force lowercase path segments + preferred image/video extensions */
function canonicalizeMediaPath(path: string): string {
  let p = path.trim().replace(/\\/g, "/");
  if (p.startsWith("./")) p = p.slice(1);

  // Strip accidental basePath so we never double-prefix
  if (BASE_PATH && (p === BASE_PATH || p.startsWith(`${BASE_PATH}/`))) {
    p = p.slice(BASE_PATH.length) || "/";
  }

  if (!p.startsWith("/")) p = `/${p}`;

  const m = p.match(/^(.*\/)([^/]+)$/);
  if (!m) return p.toLowerCase();

  const dir = m[1];
  let file = m[2];
  // Normalize extension casing: .JPEG/.JPG → .jpeg, .MP4 → .mp4
  file = file.replace(/\.jpe?g$/i, ".jpeg").replace(/\.mp4$/i, ".mp4").replace(/\.png$/i, ".png").replace(/\.webp$/i, ".webp").replace(/\.webm$/i, ".webm");
  // Keep basename casing as lowercase for GitHub Pages (Linux is case-sensitive)
  const dot = file.lastIndexOf(".");
  if (dot > 0) {
    file = `${file.slice(0, dot).toLowerCase()}${file.slice(dot)}`;
  } else {
    file = file.toLowerCase();
  }
  return `${dir}${file}`;
}

/** Join basePath + public path → `/tafseel-website/images/t1.jpeg` */
export function asset(path: string): string {
  if (!path) return `${BASE_PATH}/`;
  if (/^https?:\/\//i.test(path)) return path;

  const normalized = canonicalizeMediaPath(path);
  return `${BASE_PATH}${normalized}`;
}

/** Prefer exact lowercase `.jpeg` / `.mp4`, then common casing fallbacks */
const IMAGE_EXTS = [".jpeg", ".jpg", ".png", ".webp", ".JPEG", ".JPG", ".PNG", ".WEBP"] as const;
const VIDEO_EXTS = [".mp4", ".webm", ".MP4", ".WEBM"] as const;

function stripExt(path: string): { base: string; ext: string | null } {
  const m = path.match(/^(.*?)(\.[A-Za-z0-9]+)$/);
  if (!m) return { base: path, ext: null };
  return { base: m[1], ext: m[2] };
}

/**
 * Candidate URLs for a public media file.
 * - `t1.jpeg` → `/tafseel-website/images/t1.jpeg`
 * - `/images/y1.jpeg` → `/tafseel-website/images/y1.jpeg`
 * - `/videos/v3.mp4` → `/tafseel-website/videos/v3.mp4`
 */
export function mediaCandidates(path: string): string[] {
  let normalized = path.trim().replace(/\\/g, "/");
  if (/^https?:\/\//i.test(normalized)) return [normalized];

  if (normalized.startsWith("./")) normalized = normalized.slice(1);

  if (!normalized.startsWith("/")) {
    const lower = normalized.toLowerCase();
    normalized = lower.endsWith(".mp4") || lower.endsWith(".webm")
      ? `/videos/${normalized}`
      : `/images/${normalized}`;
  }

  normalized = canonicalizeMediaPath(normalized);

  // Prefer /images/ for product jpegs that were incorrectly rooted (e.g. /y1.jpeg)
  if (
    /^\/[a-z]+\d+\.jpeg$/i.test(normalized) &&
    !normalized.startsWith("/images/") &&
    !normalized.startsWith("/videos/")
  ) {
    // Keep gallery roots like /j1.jpeg at public root; map catalog prefixes into /images/
    const file = normalized.slice(1);
    if (!/^j\d+\.jpeg$/i.test(file)) {
      normalized = `/images/${file}`;
    }
  }

  const { base, ext } = stripExt(normalized);
  const isVideo =
    (ext && VIDEO_EXTS.some((e) => e.toLowerCase() === ext.toLowerCase())) ||
    normalized.startsWith("/videos/");

  const exts = isVideo ? VIDEO_EXTS : IMAGE_EXTS;
  const seen = new Set<string>();
  const out: string[] = [];

  const push = (p: string) => {
    const url = asset(p);
    if (!seen.has(url)) {
      seen.add(url);
      out.push(url);
    }
  };

  // Exact lowercase `.jpeg` / `.mp4` first (GitHub Pages case-sensitive)
  push(normalized);
  if (ext) {
    for (const e of exts) {
      if (e.toLowerCase() === ext.toLowerCase() && e !== ext) {
        push(`${base}${e}`);
      }
    }
  }
  for (const e of exts) push(`${base}${e}`);

  return out;
}
