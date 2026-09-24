"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { COMPANY } from "@/lib/products";
import { useApp } from "@/components/providers/AppProviders";

interface HeroProps {
  onOpenContact?: () => void;
}

const LOOP_SECONDS = 20;

export default function Hero(_props: HeroProps) {
  const { t, dir } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime >= LOOP_SECONDS) {
      video.currentTime = 0;
      void video.play();
    }
  };

  return (
    <section id="hero" className="relative isolate">
      <div className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
          aria-hidden
        >
          <source src="/vo.mp4" type="video/mp4" />
          <source src={COMPANY.heroVideoWebm} type="video/webm" />
        </video>

        {/* Multi-layer overlays — video bleeds into page canvas */}
        <div
          className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-[var(--background)]"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent"
          aria-hidden
        />

        <div
          className="relative z-20 mx-auto max-w-5xl px-6 pb-28 pt-32 text-center sm:pb-32 sm:pt-36"
          dir={dir}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D1AC81]/50 bg-black/45 px-5 py-2.5 text-sm font-semibold text-[#D1AC81] shadow-xl backdrop-blur-md">
              <span aria-hidden>✦</span>
              <span>{t.hero.badge || "الفخامة والابتكار المعماري للمظلات"}</span>
            </div>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-[#FFFFFF] drop-shadow-sm md:text-6xl lg:text-7xl">
              {t.hero.title}
            </h1>

            <p className="mx-auto mb-10 max-w-3xl text-lg font-light leading-relaxed text-[#E2E8F0] drop-shadow-sm md:text-xl">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-full bg-gradient-to-r from-[#C3986E] to-[#D1AC81] px-8 py-4 text-center font-bold text-[#3E2E1F] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl sm:w-auto"
              >
                {t.hero.ctaWhatsapp}
              </a>
              <a
                href="#applications"
                className="w-full rounded-full border border-[#D1AC81]/50 bg-black/25 px-8 py-4 text-center font-medium text-[#FAFBF9] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#C3986E] hover:bg-white/15 sm:w-auto"
              >
                {t.hero.ctaProjects}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
