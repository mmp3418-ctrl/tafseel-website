"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { mediaCandidates } from "@/lib/assets";

type PublicMediaVideoProps = {
  src: string;
  className?: string;
  onPlay?: (el: HTMLVideoElement) => void;
};

/** <video> with basePath + .mp4 casing fallbacks */
export default function PublicMediaVideo({
  src,
  className,
  onPlay,
}: PublicMediaVideoProps) {
  const candidates = useMemo(() => mediaCandidates(src), [src]);
  const [i, setI] = useState(0);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setI(0);
  }, [src]);

  if (i >= candidates.length) {
    return (
      <div
        className={`flex aspect-video items-center justify-center bg-black text-xs text-neutral-500 ${className ?? ""}`}
      >
        {src}
      </div>
    );
  }

  return (
    <video
      key={candidates[i]}
      ref={ref}
      controls
      playsInline
      preload="metadata"
      className={className}
      src={candidates[i]}
      onError={() => setI((prev) => prev + 1)}
      onPlay={(e) => onPlay?.(e.currentTarget)}
    />
  );
}
