"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { asset } from "@/lib/assets";

type ImageCarouselProps = {
  images: string[];
  alt: string;
};

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState<Record<number, boolean>>({});
  const total = images.length;

  useEffect(() => {
    setIndex(0);
    setBroken({});
  }, [images]);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (total <= 0) return;
      setIndex((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(1);
      if (e.key === "ArrowRight") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!total) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/60 text-sm text-neutral-400">
        لا توجد صور
      </div>
    );
  }

  const src = asset(images[index]);
  const isBroken = broken[index];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 p-2">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-950">
        {isBroken ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-neutral-500">
            <ImageOff className="h-8 w-8" />
            <span className="text-xs">{images[index]}</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={`${alt} — ${index + 1}`}
            className="h-full w-full object-cover transition-opacity duration-300"
            onError={() => setBroken((b) => ({ ...b, [index]: true }))}
          />
        )}
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="السابق"
        className="absolute top-1/2 left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D1AC81]/35 bg-black/55 text-[#FAFBF9] backdrop-blur-md transition hover:scale-105 hover:border-[#C3986E] hover:bg-[#C3986E]/20"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="التالي"
        className="absolute top-1/2 right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D1AC81]/35 bg-black/55 text-[#FAFBF9] backdrop-blur-md transition hover:scale-105 hover:border-[#C3986E] hover:bg-[#C3986E]/20"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-[#D1AC81]/30 bg-black/60 px-3 py-1 text-xs font-semibold tabular-nums text-[#FAFBF9] backdrop-blur-md">
        {index + 1} / {total}
      </div>
    </div>
  );
}
