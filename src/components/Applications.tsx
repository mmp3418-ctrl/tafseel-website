"use client";

import { motion } from "framer-motion";
import { useApp } from "@/components/providers/AppProviders";
import PublicMediaImg from "@/components/PublicMediaImg";

export const galleryImages = [
  { id: 1, file: "/j1.jpeg", alt: "مشروع مظلات 1" },
  { id: 2, file: "/j2.jpeg", alt: "مشروع مظلات 2" },
  { id: 3, file: "/j3.jpeg", alt: "مشروع مظلات 3" },
  { id: 4, file: "/j4.jpeg", alt: "مشروع مظلات 4" },
  { id: 5, file: "/j5.jpeg", alt: "مشروع مظلات 5" },
  { id: 6, file: "/j6.jpeg", alt: "مشروع مظلات 6" },
  { id: 7, file: "/j7.jpeg", alt: "مشروع مظلات 7" },
  { id: 8, file: "/j8.jpeg", alt: "مشروع مظلات 8" },
] as const;

export default function Applications() {
  const { t } = useApp();

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
            <span className="text-gradient-gold">{t.gallery.title}</span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((item, i) => (
            <ImageCard
              key={item.id}
              image={item.file}
              alt={item.alt}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ImageCard({
  image,
  alt,
  index,
}: {
  image: string;
  alt: string;
  index: number;
}) {
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
        <PublicMediaImg
          src={image}
          alt={alt}
          className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-64"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
