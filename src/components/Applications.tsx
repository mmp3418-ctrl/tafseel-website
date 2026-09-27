"use client";

import { motion } from "framer-motion";
import { useApp } from "@/components/providers/AppProviders";
import { asset } from "@/lib/assets";
import PublicMediaImg from "@/components/PublicMediaImg";
import type { HomeSettings } from "@/lib/home-settings";

export default function Applications({
  home,
  homeReady = true,
}: {
  home?: HomeSettings | null;
  homeReady?: boolean;
}) {
  const { t } = useApp();
  const images =
    home?.gallery?.map((item, index) => ({
      id: index + 1,
      file: item.mediaUrl,
      mediaType: item.mediaType,
      alt: item.alt || `مشروع مظلات ${index + 1}`,
    })) ?? [];

  return (
    <section id="applications" className="bg-gold-mesh py-12 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 sm:py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-8 text-center sm:mb-12"
        >
          <h2 className="text-2xl font-bold sm:text-4xl lg:text-5xl">
            <span className="text-gradient-gold">
              {home?.galleryTitle || t.gallery.title}
            </span>
          </h2>
        </motion.div>

        {!homeReady ? (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-[rgba(209,172,129,0.15)] bg-[#241E18] p-2 sm:rounded-3xl"
              >
                <div className="h-48 w-full animate-pulse rounded-xl bg-[#1A1612] sm:h-64" />
              </div>
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-3xl border border-dashed border-[#D1AC81]/30 bg-[#241E18]/50 px-6 py-16 text-center">
            <div className="h-14 w-14 rounded-2xl border border-dashed border-[#D1AC81]/25 bg-[#1A1612]" />
            <p className="text-sm text-brand-text-light sm:text-base">
              لا توجد صور في المعرض بعد.
            </p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {images.map((item, i) => (
              <ImageCard
                key={`${item.file}-${item.id}`}
                image={item.file}
                mediaType={item.mediaType}
                alt={item.alt}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ImageCard({
  image,
  mediaType,
  alt,
  index,
}: {
  image: string;
  mediaType: string;
  alt: string;
  index: number;
}) {
  const isVideo =
    mediaType === "video" || /\.(mp4|webm|ogg|mov|m4v)(?:$|[?#])/i.test(image);
  const mediaSrc = image
    ? /^https?:|^data:|^blob:/i.test(image)
      ? image
      : asset(image)
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.04, duration: 0.45 }}
      whileHover={{ scale: 1.02 }}
      className="overflow-hidden rounded-2xl border border-[rgba(209,172,129,0.2)] bg-[#241E18] p-2 transition-all duration-300 hover:border-[#C3986E] hover:shadow-xl sm:rounded-3xl"
    >
      <div className="overflow-hidden rounded-xl bg-[#1A1612]">
        {isVideo && mediaSrc ? (
          <video
            src={mediaSrc}
            controls
            playsInline
            preload="metadata"
            className="h-48 w-full object-cover sm:h-64"
          />
        ) : mediaSrc ? (
          <PublicMediaImg
            src={image}
            alt={alt}
            className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-64"
            loading="lazy"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center text-xs text-[#E2E8F0]/40 sm:h-64">
            لا توجد وسائط
          </div>
        )}
      </div>
    </motion.div>
  );
}
