"use client";

import { motion } from "framer-motion";
import {
  ClipboardCheck,
  DraftingCompass,
  Factory,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProviders";

const ICONS: LucideIcon[] = [
  ClipboardCheck,
  DraftingCompass,
  Factory,
  Wrench,
];

export default function Process() {
  const { t, dir } = useApp();

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-brand-surface py-20 lg:py-32"
    >
      <div
        className="section-stripe pointer-events-none absolute inset-0 opacity-80"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-12"
          dir={dir}
        >
          <span className="brand-badge">✦ {t.process.badge}</span>
          <h2 className="mt-4 text-3xl font-bold text-brand-dark sm:text-4xl">
            {t.process.title}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-brand-text-light sm:text-base">
            {t.process.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, i) => {
            const Icon = ICONS[i];
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                whileHover={{ scale: 1.02 }}
                className="brand-card flex flex-col rounded-2xl p-6 transition-all duration-300 hover:border-[#C3986E]"
                dir={dir}
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <span className="font-mono text-2xl font-light text-brand-primary">
                    {num}
                  </span>
                  <span className="icon-chip">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                </div>

                <span className="mb-3 inline-flex w-fit rounded-full border border-brand-brown/15 bg-brand-bg px-2.5 py-1 text-[11px] font-medium text-brand-dark">
                  {step.badge}
                </span>

                <h3 className="text-lg font-bold text-brand-dark">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-brand-text-light sm:text-sm">
                  {step.text}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
