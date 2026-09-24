"use client";

import { motion } from "framer-motion";
import {
  CloudRain,
  Layers,
  Shield,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProviders";

const ICONS: LucideIcon[] = [CloudRain, Wind, Layers, Shield];

export default function Features() {
  const { t, dir } = useApp();

  return (
    <section id="features" className="relative bg-gold-mesh py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
          dir={dir}
        >
          <span className="brand-badge mb-4">✦ {t.features.badge}</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            <span className="text-gradient-gold">{t.features.title}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-brand-text-light">
            {t.features.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.features.items.map((feature, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-3xl border border-[#D1AC81]/20 bg-brand-surface p-7 shadow-[0_12px_40px_rgba(62,46,31,0.05)] transition-all duration-300 hover:border-[#C3986E] hover:shadow-[0_20px_50px_rgba(62,46,31,0.1)]"
                dir={dir}
              >
                <div className="icon-chip mb-5">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-brand-dark">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-text-light">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
