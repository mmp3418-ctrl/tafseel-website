"use client";

import { useRef } from "react";
import { COMPANY } from "@/lib/products";
import { useApp } from "@/components/providers/AppProviders";
import { asset } from "@/lib/assets";
import { useIsMounted } from "@/hooks/useIsMounted";

interface HeroProps {
  onOpenContact?: () => void;
}

const LOOP_SECONDS = 20;

export default function Hero(_props: HeroProps) {
  const { t, dir } = useApp();
  const mounted = useIsMounted();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime >= LOOP_SECONDS) {
      video.currentTime = 0;
      void video.play();
    }
  };

  const badge = t?.hero?.badge || "الفخامة والابتكار المعماري للمظلات";
  const title = t?.hero?.title || "نبتكر الظل.. لنصنع الفخامة المعمارية";
  const subtitle =
    t?.hero?.subtitle ||
    "أنظمة مظلات حديثة وهياكل معمارية متطورة مصممة بأعلى معايير الأناقة والمتانة للمنازل والمنشآت الفاخرة في ليبيا.";
  const ctaWhatsapp = t?.hero?.ctaWhatsapp || "تواصل معنا عبر واتساب";
  const ctaProjects = t?.hero?.ctaProjects || "استكشف مشاريعنا";

  return (
    <section id="hero" className="relative isolate">
      <div className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden sm:min-h-[92vh]">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
          aria-hidden
        >
          <source src={asset("/vo.mp4")} type="video/mp4" />
          <source src={asset("/vo.webm")} type="video/webm" />
        </video>

        <div
          className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-[var(--background)]"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent sm:h-40"
          aria-hidden
        />

        <div
          className={`relative z-20 mx-auto w-full max-w-5xl px-4 pb-20 pt-28 text-center transition-opacity duration-500 sm:px-6 sm:pb-32 sm:pt-36 ${
            mounted ? "opacity-100" : "opacity-100"
          }`}
          dir={dir || "rtl"}
        >
          <div className="fade-in-up">
            <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-[#D1AC81]/50 bg-black/45 px-3 py-2 text-xs font-semibold text-[#D1AC81] shadow-xl backdrop-blur-md sm:mb-6 sm:px-5 sm:py-2.5 sm:text-sm">
              <span aria-hidden>✦</span>
              <span className="truncate">{badge}</span>
            </div>

            <h1 className="mb-4 text-2xl font-extrabold leading-tight tracking-tight text-[#FFFFFF] drop-shadow-sm sm:mb-6 sm:text-4xl md:text-6xl lg:text-7xl">
              {title}
            </h1>

            <p className="mx-auto mb-8 max-w-3xl text-sm font-light leading-relaxed text-[#E2E8F0] drop-shadow-sm sm:mb-10 sm:text-lg md:text-xl">
              {subtitle}
            </p>

            <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-full bg-gradient-to-r from-[#C3986E] to-[#D1AC81] px-6 py-3.5 text-center text-sm font-bold text-[#3E2E1F] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                {ctaWhatsapp}
              </a>
              <a
                href="#applications"
                className="w-full rounded-full border border-[#D1AC81]/50 bg-black/25 px-6 py-3.5 text-center text-sm font-medium text-[#FAFBF9] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#C3986E] hover:bg-white/15 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                {ctaProjects}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
