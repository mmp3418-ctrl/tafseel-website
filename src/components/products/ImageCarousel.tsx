"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import PublicMediaImg from "@/components/PublicMediaImg";

type ImageCarouselProps = {
  images: string[];
  alt: string;
  className?: string;
  /** Compact mode for product cards */
  compact?: boolean;
};

export default function ImageCarousel({
  images,
  alt,
  className = "",
  compact = false,
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const total = images.length;

  useEffect(() => {
    setIndex(0);
    setFailed(false);
  }, [images]);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (total <= 1) return;
      setFailed(false);
      setIndex((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  const select = useCallback((next: number) => {
    setFailed(false);
    setIndex(next);
  }, []);

  const current = useMemo(() => images[index] ?? "", [images, index]);
  const showControls = total > 1;

  if (!total) {
    return (
      <div
        className={`flex h-full min-h-[10rem] items-center justify-center bg-[#1A1612] text-xs text-neutral-500 ${className}`}
      >
        لا توجد صور
      </div>
    );
  }

  return (
    <div className={`group relative flex h-full flex-col overflow-hidden bg-[#1A1612] ${className}`}>
      <div className={`relative w-full flex-1 overflow-hidden ${compact ? "aspect-[16/11]" : "aspect-[16/10]"}`}>
        {failed ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-neutral-500">
            <ImageOff className="h-8 w-8" />
            <span className="max-w-[90%] truncate px-2 text-xs">{current}</span>
          </div>
        ) : (
          <PublicMediaImg
            key={current}
            src={current}
            alt={`${alt} — ${index + 1}`}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            loading={index === 0 ? "eager" : "lazy"}
            onAllFailed={() => setFailed(true)}
          />
        )}

        {showControls ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="السابق"
              className="absolute top-1/2 left-2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D1AC81]/35 bg-black/55 text-[#FAFBF9] opacity-0 backdrop-blur-md transition-all duration-300 hover:border-[#C3986E] hover:bg-[#C3986E]/25 group-hover:opacity-100 sm:left-3 sm:h-9 sm:w-9"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="التالي"
              className="absolute top-1/2 right-2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D1AC81]/35 bg-black/55 text-[#FAFBF9] opacity-0 backdrop-blur-md transition-all duration-300 hover:border-[#C3986E] hover:bg-[#C3986E]/25 group-hover:opacity-100 sm:right-3 sm:h-9 sm:w-9"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <div className="pointer-events-none absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full border border-[#D1AC81]/30 bg-black/60 px-2.5 py-0.5 text-[10px] font-semibold tabular-nums text-[#FAFBF9] backdrop-blur-md sm:bottom-3 sm:px-3 sm:py-1 sm:text-xs">
              {index + 1} / {total}
            </div>
          </>
        ) : null}
      </div>

      {showControls ? (
        <div
          className="flex gap-1.5 overflow-x-auto border-t border-[#D1AC81]/15 bg-[#241E18]/90 p-1.5 no-scrollbar sm:gap-2 sm:p-2"
          dir="ltr"
        >
          {images.map((src, i) => {
            const active = i === index;
            return (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  select(i);
                }}
                aria-label={`صورة ${i + 1}`}
                aria-current={active ? "true" : undefined}
                className={`relative h-10 w-12 shrink-0 overflow-hidden rounded-md border transition-all duration-200 sm:h-12 sm:w-14 sm:rounded-lg ${
                  active
                    ? "border-[#C3986E] ring-1 ring-[#C3986E]/50"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
