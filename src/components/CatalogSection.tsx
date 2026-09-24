"use client";

import { motion } from "framer-motion";
import { useApp } from "@/components/providers/AppProviders";
import CatalogDownloadLink from "@/components/CatalogDownloadLink";

export default function CatalogSection() {
  const { t, dir } = useApp();

  return (
    <section id="catalog" className="bg-brand-bg py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
          className="brand-card rounded-3xl p-8 text-center transition-all duration-300 hover:border-[#C3986E] sm:p-12"
          dir={dir}
        >
          <span className="brand-badge">✦ {t.catalog.badge}</span>

          <h2 className="mt-5 text-2xl font-bold text-brand-dark sm:text-3xl lg:text-4xl">
            {t.catalog.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-brand-text-light sm:text-base">
            {t.catalog.subtitle}
          </p>

          <p className="mt-5 text-sm text-brand-accent">{t.catalog.tags}</p>

          <div className="mt-8 flex justify-center">
            <CatalogDownloadLink />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
