"use client";

import { useEffect, useMemo, useState } from "react";
import { mediaCandidates } from "@/lib/assets";

type PublicMediaImgProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  onAllFailed?: () => void;
};

/**
 * <img> that prepends GitHub Pages basePath and falls back across
 * .jpeg / .jpg / .JPG / .JPEG (and png/webp) when a file 404s.
 */
export default function PublicMediaImg({
  src,
  alt,
  className,
  loading = "lazy",
  onAllFailed,
}: PublicMediaImgProps) {
  const candidates = useMemo(() => mediaCandidates(src), [src]);
  const [i, setI] = useState(0);

  useEffect(() => {
    setI(0);
  }, [src]);

  if (i >= candidates.length) {
    onAllFailed?.();
    return (
      <div
        className={`flex items-center justify-center bg-neutral-950 text-xs text-neutral-500 ${className ?? ""}`}
      >
        {src}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={candidates[i]}
      src={candidates[i]}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setI((prev) => prev + 1)}
    />
  );
}
