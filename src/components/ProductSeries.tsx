"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { COMPANY } from "@/lib/products";
import { useApp } from "@/components/providers/AppProviders";
import PublicMediaImg from "@/components/PublicMediaImg";
import { asset } from "@/lib/assets";
import type { HomeSettings } from "@/lib/home-settings";

export default function ProductSeries({
  home,
  homeReady = true,
}: {
  home?: HomeSettings | null;
  homeReady?: boolean;
}) {
  const { t, dir, site } = useApp();
  const data = home ?? site;

  const series = useMemo(() => {
    const saved = data?.featured ?? [];
    return [0, 1].map((index) => ({
      id: index + 1,
      image: saved[index]?.mediaUrl || "",
      mediaType: saved[index]?.mediaType || "image",
      title:
        saved[index]?.title ||
        (index === 0 ? t.products.card1Title : t.products.card2Title),
      description:
        saved[index]?.description ||
        (index === 0 ? t.products.card1Desc : t.products.card2Desc),
    }));
  }, [data, t]);

  return (
    <section id="products" className="bg-gold-mesh py-12 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-8 text-center sm:mb-14"
        >
          <h2 className="text-2xl font-bold sm:text-4xl lg:text-5xl">
            <span className="text-gradient-gold">
              {data?.productsTitle || t.products.title}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl px-2 text-sm leading-relaxed text-brand-text-light sm:mt-4 sm:text-base">
            {data?.productsSubtitle || t.products.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {series.map((item, i) => (
            <SeriesCard
              key={item.id}
              item={item}
              index={i}
              orderLabel={data?.orderLabel || t.products.orderNow}
              whatsappUrl={data?.whatsappUrl || site.whatsappUrl || COMPANY.whatsappUrl}
              dir={dir}
              loading={!homeReady}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SeriesCard({
  item,
  index,
  orderLabel,
  whatsappUrl,
  dir,
  loading,
}: {
  item: {
    id: number;
    image: string;
    mediaType: string;
    title: string;
    description: string;
  };
  index: number;
  orderLabel: string;
  whatsappUrl: string;
  dir: "rtl" | "ltr";
  loading: boolean;
}) {
  const isVideo =
    item.mediaType === "video" ||
    /\.(mp4|webm|ogg|mov|m4v)(?:$|[?#])/i.test(item.image);
  const mediaSrc = item.image
    ? /^https?:|^data:|^blob:/i.test(item.image)
      ? item.image
      : asset(item.image)
    : "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="overflow-hidden rounded-2xl border border-[rgba(209,172,129,0.2)] bg-[#241E18] p-3 transition-all duration-300 hover:border-[#C3986E] hover:shadow-xl sm:rounded-3xl sm:p-6"
    >
      <div className="mb-4 overflow-hidden rounded-xl bg-[#1A1612] sm:mb-6">
        {loading ? (
          <div className="h-48 w-full animate-pulse bg-[#2A231C] sm:h-64" aria-hidden />
        ) : isVideo && mediaSrc ? (
          <video
            src={mediaSrc}
            controls
            playsInline
            preload="metadata"
            className="h-48 w-full object-cover sm:h-64"
          />
        ) : mediaSrc ? (
          <PublicMediaImg
            src={item.image}
            alt={item.title}
            className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-64"
            loading="lazy"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-[#1A1612] text-xs text-[#E2E8F0]/40 sm:h-64">
            لا توجد صورة
          </div>
        )}
      </div>

      <div className="px-1 sm:px-0" dir={dir}>
        <h3 className="text-lg font-bold text-[#FAFBF9] sm:text-2xl">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#E2E8F0]/85 sm:mt-3 sm:text-[15px]">
          {item.description}
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#C3986E] to-[#85633E] py-3 text-center text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:opacity-95 sm:mt-6 sm:py-3.5"
        >
          {orderLabel}
        </a>
      </div>
    </motion.article>
  );
}
