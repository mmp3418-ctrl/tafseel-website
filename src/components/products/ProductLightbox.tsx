"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import PublicMediaImg from "@/components/PublicMediaImg";

type ProductLightboxProps = {
  open: boolean;
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

const SWIPE_THRESHOLD = 56;

export default function ProductLightbox({
  open,
  images,
  index,
  alt,
  onClose,
  onIndexChange,
}: ProductLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const total = images.length;
  const current = images[index] ?? "";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setZoomed(false);
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    setZoomed(false);
  }, [index]);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (total <= 1) return;
      setZoomed(false);
      const next = (index + dir + total) % total;
      onIndexChange(next);
    },
    [index, onIndexChange, total]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  // Prefetch neighbors
  useEffect(() => {
    if (!open || total < 2) return;
    const neighbors = [
      images[(index + 1) % total],
      images[(index - 1 + total) % total],
    ];
    neighbors.forEach((src) => {
      if (!src) return;
      const img = new window.Image();
      img.src = src;
    });
  }, [open, index, images, total]);

  const onTouchStart = (e: ReactTouchEvent) => {
    const t = e.changedTouches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: ReactTouchEvent) => {
    if (!touchStart.current || zoomed) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    // RTL-friendly: swipe left → next, swipe right → previous
    go(dx < 0 ? 1 : -1);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && total > 0 ? (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col bg-black/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`معرض صور: ${alt}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-zoom-out"
            aria-label="إغلاق"
            onClick={onClose}
          />

          <div className="relative z-10 flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
            <p className="truncate text-sm font-semibold text-[#FAFBF9]/90 sm:text-base">
              {alt}
              {total > 1 ? (
                <span className="ms-2 tabular-nums text-[#D1AC81]/90">
                  {index + 1} / {total}
                </span>
              ) : null}
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D1AC81]/35 bg-[#241E18]/80 text-[#D1AC81] transition hover:border-[#C3986E] hover:bg-[#C3986E]/20"
                aria-label={zoomed ? "تصغير" : "تكبير"}
              >
                {zoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D1AC81]/35 bg-[#241E18]/80 text-[#FAFBF9] transition hover:border-[#C3986E] hover:bg-[#C3986E]/20"
                aria-label="إغلاق"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-2 sm:px-10"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={(e) => e.stopPropagation()}
          >
            {total > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="السابق"
                  className="absolute top-1/2 left-2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#D1AC81]/40 bg-black/60 text-[#FAFBF9] backdrop-blur-md transition hover:scale-105 hover:border-[#C3986E] hover:bg-[#C3986E]/25 sm:left-4 sm:h-12 sm:w-12"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="التالي"
                  className="absolute top-1/2 right-2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#D1AC81]/40 bg-black/60 text-[#FAFBF9] backdrop-blur-md transition hover:scale-105 hover:border-[#C3986E] hover:bg-[#C3986E]/25 sm:right-4 sm:h-12 sm:w-12"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            ) : null}

            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              className={`relative mx-auto h-[min(72vh,720px)] w-full max-w-5xl overflow-hidden rounded-2xl border border-[#D1AC81]/20 bg-[#12100E] shadow-2xl ${
                zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => setZoomed((z) => !z)}
            >
              <div
                className={`relative h-full w-full transition-transform duration-300 ease-out ${
                  zoomed ? "scale-[1.55]" : "scale-100"
                }`}
              >
                <PublicMediaImg
                  src={current}
                  alt={`${alt} — ${index + 1}`}
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                  showSkeleton
                />
              </div>
            </motion.div>
          </div>

          {total > 1 ? (
            <div
              className="relative z-10 flex justify-center gap-2 overflow-x-auto px-4 py-3 no-scrollbar sm:py-4"
              dir="ltr"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((src, i) => {
                const active = i === index;
                return (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => onIndexChange(i)}
                    aria-label={`صورة ${i + 1}`}
                    aria-current={active ? "true" : undefined}
                    className={`relative h-14 w-16 shrink-0 overflow-hidden rounded-lg border transition-all duration-200 sm:h-16 sm:w-20 ${
                      active
                        ? "border-[#C3986E] ring-2 ring-[#C3986E]/45"
                        : "border-[#D1AC81]/25 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <PublicMediaImg
                      src={src}
                      alt=""
                      className="object-cover"
                      sizes="80px"
                      loading="lazy"
                      showSkeleton={false}
                    />
                  </button>
                );
              })}
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
