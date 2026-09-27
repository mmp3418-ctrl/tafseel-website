"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { COMPANY } from "@/lib/products";
import { useApp } from "@/components/providers/AppProviders";
import PublicMediaImg from "@/components/PublicMediaImg";
import { asset } from "@/lib/assets";
import type { HomeSettings } from "@/lib/home-settings";

const EMPTY_SLOTS = 2;

type CardItem = {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  empty: boolean;
};

export default function ProductSeries({
  home,
  homeReady = true,
}: {
  home?: HomeSettings | null;
  homeReady?: boolean;
}) {
  const { t, dir, site } = useApp();
  const data = home ?? site;

  const series = useMemo((): CardItem[] => {
    const saved = data?.featured ?? [];
    if (saved.length > 0) {
      return saved.map((item, index) => {
        const hasContent = Boolean(item.title || item.description || item.mediaUrl);
        return {
          id: item.id || `card-${index}`,
          title: item.title || "",
          description: item.description || "",
          mediaUrl: item.mediaUrl || "",
          mediaType: item.mediaType || "image",
          empty: !hasContent,
        };
      });
    }
    return Array.from({ length: EMPTY_SLOTS }, (_, index) => ({
      id: `empty-${index}`,
      title: "",
      description: "",
      mediaUrl: "",
      mediaType: "image" as const,
      empty: true,
    }));
  }, [data]);

  const whatsappUrl =
    data?.whatsapps?.[0]?.url ||
    data?.whatsappUrl ||
    site.whatsappUrl ||
    COMPANY.whatsappUrl;

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
          {data?.productsSubtitle ? (
            <p className="mx-auto mt-3 max-w-2xl px-2 text-sm leading-relaxed text-brand-text-light sm:mt-4 sm:text-base">
              {data.productsSubtitle}
            </p>
          ) : null}
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {series.map((item, i) => (
            <SeriesCard
              key={item.id}
              item={item}
              index={i}
              orderLabel={data?.orderLabel || t.products.orderNow}
              whatsappUrl={whatsappUrl}
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
  item: CardItem;
  index: number;
  orderLabel: string;
  whatsappUrl: string;
  dir: "rtl" | "ltr";
  loading: boolean;
}) {
  const isVideo =
    item.mediaType === "video" ||
    /\.(mp4|webm|ogg|mov|m4v)(?:$|[?#])/i.test(item.mediaUrl);
  const mediaSrc = item.mediaUrl
    ? /^https?:|^data:|^blob:/i.test(item.mediaUrl)
      ? item.mediaUrl
      : asset(item.mediaUrl)
    : "";
  const isEmpty = item.empty && !item.mediaUrl && !item.title && !item.description;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index, 8) * 0.08, duration: 0.5 }}
      whileHover={isEmpty ? undefined : { scale: 1.02 }}
      className={`overflow-hidden rounded-2xl border bg-[#241E18] p-3 transition-all duration-300 sm:rounded-3xl sm:p-6 ${
        isEmpty
          ? "border-dashed border-[rgba(209,172,129,0.35)]"
          : "border-[rgba(209,172,129,0.2)] hover:border-[#C3986E] hover:shadow-xl"
      }`}
    >
      <div className="mb-4 overflow-hidden rounded-xl border border-[rgba(209,172,129,0.08)] bg-[#1A1612] sm:mb-6">
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
            src={item.mediaUrl}
            alt={item.title || "منتج"}
            className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-64"
            loading="lazy"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-[#1A1612] sm:h-64">
            <div className="h-16 w-16 rounded-2xl border border-dashed border-[#D1AC81]/30 bg-[#241E18]/80" />
          </div>
        )}
      </div>

      <div className="px-1 sm:px-0" dir={dir}>
        {item.title ? (
          <h3 className="text-lg font-bold text-[#FAFBF9] sm:text-2xl">{item.title}</h3>
        ) : (
          <div className="h-7 w-2/3 rounded-lg bg-[#2A231C]/80" aria-hidden />
        )}
        {item.description ? (
          <p className="mt-2 text-sm leading-relaxed text-[#E2E8F0]/85 sm:mt-3 sm:text-[15px]">
            {item.description}
          </p>
        ) : (
          <div className="mt-3 space-y-2" aria-hidden>
            <div className="h-3 w-full rounded bg-[#2A231C]/70" />
            <div className="h-3 w-5/6 rounded bg-[#2A231C]/55" />
          </div>
        )}

        {!isEmpty ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#C3986E] to-[#85633E] py-3 text-center text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:opacity-95 sm:mt-6 sm:py-3.5"
          >
            {orderLabel}
          </a>
        ) : (
          <div className="mt-4 h-11 w-full rounded-xl border border-dashed border-[#D1AC81]/25 bg-[#1A1612]/60 sm:mt-6" />
        )}
      </div>
    </motion.article>
  );
}
