"use client";

import { motion } from "framer-motion";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { COMPANY } from "@/lib/products";
import { useApp } from "@/components/providers/AppProviders";
import type { SVGProps } from "react";

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3H13V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.05v13.5a2.89 2.89 0 1 1-2.03-2.76v-3.1a6 6 0 1 0 5.08 5.93V9.4a8.16 8.16 0 0 0 3.77.94V6.69z" />
    </svg>
  );
}

export default function ContactSection() {
  const { t, dir } = useApp();

  const branches = [
    {
      title: t.contact.branch1,
      area: t.contact.branch1Area,
      detail: t.contact.branch1Detail,
    },
    {
      title: t.contact.branch2,
      area: t.contact.branch2Area,
      detail: t.contact.branch2Detail,
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gold-mesh py-20 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#9EB9E1]/15 via-transparent to-[#C3986E]/10"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
          dir={dir}
        >
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            <span className="text-gradient-gold">{t.contact.title}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-brand-text-light sm:text-base">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {branches.map((branch, i) => (
            <motion.div
              key={branch.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              whileHover={{ scale: 1.02 }}
              className="glass-panel card-hover-3d rounded-3xl border border-[#D1AC81]/30 p-7 transition-all duration-300 hover:border-[#C3986E]"
              dir={dir}
            >
              <span className="icon-chip mb-4">
                <MapPin className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <p className="text-xs font-medium tracking-wide text-[#C3986E]">
                {branch.title}
              </p>
              <h3 className="mt-1 text-xl font-bold text-brand-dark">
                {branch.area}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-text-light">
                {branch.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl border border-[#D1AC81]/30 p-6 shadow-xl sm:p-8"
        >
          <div
            className="flex flex-col items-stretch justify-between gap-6 lg:flex-row lg:items-center"
            dir={dir}
          >
            <div>
              <p className="text-sm text-brand-text-light">
                {t.contact.phoneLabel}
              </p>
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-2xl font-bold text-brand-dark transition hover:text-[#C3986E]"
                dir="ltr"
              >
                {COMPANY.phone}
              </a>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`tel:${COMPANY.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C3986E] to-[#D1AC81] px-7 py-3.5 text-sm font-bold text-[#3E2E1F] shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                <Phone className="h-4 w-4" />
                {t.contact.callNow}
              </a>
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-7 py-3.5 text-sm font-semibold text-[#128C7E] transition hover:scale-[1.02] hover:bg-[#25D366]/18"
              >
                <MessageCircle className="h-4 w-4" />
                {t.contact.whatsappDirect}
              </a>
            </div>

            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <a
                href={COMPANY.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D1AC81]/35 bg-brand-surface text-[#C3986E] shadow-md transition hover:scale-105 hover:border-[#C3986E] hover:bg-[#C3986E] hover:text-[#FAFBF9]"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href={COMPANY.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D1AC81]/35 bg-brand-surface text-[#C3986E] shadow-md transition hover:scale-105 hover:border-[#C3986E] hover:bg-[#C3986E] hover:text-[#FAFBF9]"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
