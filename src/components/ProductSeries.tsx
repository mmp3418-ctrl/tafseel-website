"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { COMPANY } from "@/lib/products";
import { useApp } from "@/components/providers/AppProviders";
import PublicMediaImg from "@/components/PublicMediaImg";

export default function ProductSeries() {
  const { t, dir } = useApp();

  const series = useMemo(
    () => [
      {
        id: 1,
        image: "/j7.jpeg",
        title: t.products.card1Title,
        description: t.products.card1Desc,
      },
      {
        id: 2,
        image: "/j8.jpeg",
        title: t.products.card2Title,
        description: t.products.card2Desc,
      },
    ],
    [t]
  );

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
            <span className="text-gradient-gold">{t.products.title}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl px-2 text-sm leading-relaxed text-brand-text-light sm:mt-4 sm:text-base">
            {t.products.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {series.map((item, i) => (
            <SeriesCard
              key={item.id}
              item={item}
              index={i}
              orderLabel={t.products.orderNow}
              dir={dir}
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
  dir,
}: {
  item: { id: number; image: string; title: string; description: string };
  index: number;
  orderLabel: string;
  dir: "rtl" | "ltr";
}) {
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
        <PublicMediaImg
          src={item.image}
          alt={item.title}
          className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-64"
          loading="lazy"
        />
      </div>

      <div className="px-1 sm:px-0" dir={dir}>
        <h3 className="text-lg font-bold text-[#FAFBF9] sm:text-2xl">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#E2E8F0]/85 sm:mt-3 sm:text-[15px]">
          {item.description}
        </p>

        <a
          href={COMPANY.whatsappUrl}
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
