"use client";

import { useEffect, useMemo, useState } from "react";
import { mediaCandidates } from "@/lib/assets";

type PublicMediaImgProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  /** Prefer for above-the-fold / active carousel slide */
  priority?: boolean;
  /** Kept for API compatibility with next/image call sites */
  sizes?: string;
  onAllFailed?: () => void;
  /** Subtle pulse placeholder until the image loads */
  showSkeleton?: boolean;
  /** Fires when the visible candidate finishes loading */
  onLoadComplete?: () => void;
};

function splitClassName(className?: string) {
  const tokens = (className ?? "").split(/\s+/).filter(Boolean);
  const objectFit: string[] = [];
  const motion: string[] = [];
  const layout: string[] = [];

  for (const token of tokens) {
    if (token.startsWith("object-")) {
      objectFit.push(token);
    } else if (
      token.startsWith("transition") ||
      token.startsWith("duration-") ||
      token.startsWith("ease-") ||
      token.startsWith("group-hover:") ||
      token.startsWith("hover:")
    ) {
      motion.push(token);
    } else {
      layout.push(token);
    }
  }

  return {
    layout: layout.length ? layout.join(" ") : "h-full w-full",
    objectFit: objectFit.length ? objectFit.join(" ") : "object-cover",
    motion: motion.join(" "),
  };
}

/**
 * Static-export safe media image (GitHub Pages).
 * Uses native <img> with lazy loading + skeleton — avoids next/image
 * Image Optimization API which is incompatible with `output: "export"`.
 */
export default function PublicMediaImg({
  src,
  alt,
  className,
  loading = "lazy",
  priority = false,
  sizes = "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 340px",
  onAllFailed,
  showSkeleton = true,
  onLoadComplete,
}: PublicMediaImgProps) {
  const candidates = useMemo(() => mediaCandidates(src), [src]);
  const [i, setI] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const parts = useMemo(() => splitClassName(className), [className]);

  useEffect(() => {
    setI(0);
    setLoaded(false);
  }, [src]);

  if (!src?.trim() || i >= candidates.length) {
    if (i >= candidates.length) onAllFailed?.();
    return (
      <div
        className={`flex items-center justify-center bg-[#1A1612] text-xs text-neutral-500 ${parts.layout}`}
      >
        {src || "لا توجد صورة"}
      </div>
    );
  }

  const current = candidates[i];

  return (
    <span className={`relative block overflow-hidden ${parts.layout}`}>
      {showSkeleton && !loaded ? (
        <span
          aria-hidden
          className="absolute inset-0 z-[1] animate-pulse bg-gradient-to-br from-[#2A231C] via-[#1A1612] to-[#2A231C]"
        >
          <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(209,172,129,0.12),transparent_65%)]" />
        </span>
      ) : null}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={current}
        src={current}
        alt={alt}
        sizes={sizes}
        loading={priority ? "eager" : loading}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={`absolute inset-0 h-full w-full ${parts.objectFit} ${parts.motion} transition-opacity duration-500 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => {
          setLoaded(true);
          onLoadComplete?.();
        }}
        onError={() => {
          setLoaded(false);
          setI((prev) => prev + 1);
        }}
      />
    </span>
  );
}
