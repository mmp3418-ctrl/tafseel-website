"use client";

import { motion } from "framer-motion";
import { PROJECT_GALLERY_IMAGES } from "@/lib/product-catalog";
import PublicMediaImg from "@/components/PublicMediaImg";

export default function ProjectsGallery() {
  return (
    <section className="relative bg-brand-bg px-4 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-14">
          <span className="brand-badge">✦ المشاريع</span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            <span className="text-gradient-gold">معرض المشاريع</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-brand-text-light sm:text-base">
            مختارات من أعمال التركيب والتنفيذ.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROJECT_GALLERY_IMAGES.map((src, i) => (
            <motion.article
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group overflow-hidden rounded-2xl border border-[rgba(209,172,129,0.2)] bg-[#241E18] p-2"
            >
              <div className="aspect-square overflow-hidden rounded-xl bg-[#1A1612]">
                <PublicMediaImg
                  src={src}
                  alt={`مشروع ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
