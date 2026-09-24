"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useApp } from "@/components/providers/AppProviders";

export const galleryImages = [
  { id: 1, image: "/j1.jpeg", alt: "مشروع مظلات 1" },
  { id: 2, image: "/j2.jpeg", alt: "مشروع مظلات 2" },
  { id: 3, image: "/j3.jpeg", alt: "مشروع مظلات 3" },
  { id: 4, image: "/j4.jpeg", alt: "مشروع مظلات 4" },
  { id: 5, image: "/j5.jpeg", alt: "مشروع مظلات 5" },
  { id: 6, image: "/j6.jpeg", alt: "مشروع مظلات 6" },
  { id: 7, image: "/j7.jpeg", alt: "مشروع مظلات 7" },
  { id: 8, image: "/j8.jpeg", alt: "مشروع مظلات 8" },
] as const;

export default function Applications() {
  const { t } = useApp();

  return (
    <section id="applications" className="bg-gold-mesh py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            <span className="text-gradient-gold">{t.gallery.title}</span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {galleryImages.map((item, i) => (
            <ImageCard
              key={item.id}
              image={item.image}
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
      className="overflow-hidden rounded-3xl border border-[rgba(209,172,129,0.2)] bg-[#241E18] p-2 transition-all duration-300 hover:border-[#C3986E] hover:shadow-xl"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#1A1612]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
          unoptimized
        />
      </div>
    </motion.div>
  );
}
