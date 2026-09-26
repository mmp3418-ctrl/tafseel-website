"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PRODUCT_CATEGORIES,
  type ProductCategoryId,
} from "@/lib/product-catalog";
import ImageCarousel from "@/components/products/ImageCarousel";
import CategoryVideos from "@/components/products/CategoryVideos";

export default function ProductsCatalog() {
  const [activeId, setActiveId] = useState<ProductCategoryId>(
    PRODUCT_CATEGORIES[0].id
  );

  const active = useMemo(
    () =>
      PRODUCT_CATEGORIES.find((c) => c.id === activeId) ?? PRODUCT_CATEGORIES[0],
    [activeId]
  );

  return (
    <section className="relative bg-brand-bg px-4 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <span className="brand-badge">✦ المنتجات</span>
          <h1 className="mt-4 text-3xl font-bold text-brand-dark sm:text-4xl lg:text-5xl">
            <span className="text-gradient-gold">تشكيلة المظلات</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-brand-text-light sm:text-base">
            اختر الفئة لاستعراض الصور والفيديوهات الخاصة بكل نوع مظلة.
          </p>
        </div>

        <div
          className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3"
          role="tablist"
          aria-label="فئات المنتجات"
          dir="rtl"
        >
          {PRODUCT_CATEGORIES.map((cat) => {
            const selected = cat.id === activeId;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(cat.id)}
                className={`rounded-full px-4 py-2.5 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                  selected
                    ? "bg-gradient-to-r from-[#C3986E] to-[#D1AC81] text-[#12100E] shadow-lg scale-[1.02]"
                    : "border border-[#D1AC81]/25 bg-[#241E18] text-[#E2E8F0] hover:border-[#C3986E] hover:text-[#D1AC81]"
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-5 text-center text-xl font-bold text-[#FAFBF9] sm:text-2xl">
              {active.title}
            </h2>

            <ImageCarousel images={active.images} alt={active.title} />

            <CategoryVideos
              videos={active.videos}
              featuredVideo={active.featuredVideo}
              resetKey={active.id}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
