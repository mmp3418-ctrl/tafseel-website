/**
 * Normalize Firestore product media into a consistent shape.
 * Supports legacy `mediaUrl` and new `images: string[]`.
 */

export type ProductMedia = {
  images: string[];
  mediaUrl: string;
  mediaType: "image" | "video";
};

function isVideoUrl(url: string, mediaType?: string): boolean {
  if (mediaType === "video") return true;
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov|m4v)(?:$|[?#])/i.test(url);
}

function asUrlList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

export function normalizeProductMedia(data: Record<string, unknown>): ProductMedia {
  const legacyUrl = typeof data.mediaUrl === "string" ? data.mediaUrl.trim() : "";
  const legacyType = typeof data.mediaType === "string" ? data.mediaType : "image";
  const fromArray = asUrlList(data.images);

  const imageUrls = fromArray.filter((url) => !isVideoUrl(url));
  const hasLegacyImage = legacyUrl && !isVideoUrl(legacyUrl, legacyType);

  let images = imageUrls;
  if (!images.length && hasLegacyImage) {
    images = [legacyUrl];
  }

  // Deduplicate while preserving order
  const seen = new Set<string>();
  images = images.filter((url) => {
    if (seen.has(url)) return false;
    seen.add(url);
    return true;
  });

  if (isVideoUrl(legacyUrl, legacyType) && !images.length) {
    return {
      images: [],
      mediaUrl: legacyUrl,
      mediaType: "video",
    };
  }

  return {
    images,
    mediaUrl: images[0] || legacyUrl,
    mediaType: images.length ? "image" : isVideoUrl(legacyUrl, legacyType) ? "video" : "image",
  };
}
