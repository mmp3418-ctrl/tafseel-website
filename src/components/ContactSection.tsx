"use client";

import { motion } from "framer-motion";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { COMPANY } from "@/lib/products";
import { useApp } from "@/components/providers/AppProviders";
import SocialIcon from "@/components/SocialIcon";
import type { HomeSettings } from "@/lib/home-settings";

const socialBtnClass =
  "flex h-12 w-12 items-center justify-center rounded-full border border-[#D1AC81]/35 bg-brand-surface text-[#C3986E] shadow-md transition hover:scale-105 hover:border-[#C3986E] hover:bg-[#C3986E] hover:text-[#FAFBF9]";

export default function ContactSection({ home }: { home?: HomeSettings | null }) {
  const { t, dir, site } = useApp();
  const data = home ?? site;

  const branches = data?.branches?.length
    ? data.branches
    : [
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

  const phones =
    data?.phones?.length > 0
      ? data.phones
      : data?.phone
        ? [
            {
              label: t.contact.phoneLabel,
              display: data.phone,
              tel: data.phoneTel || COMPANY.phoneTel,
            },
          ]
        : [
            {
              label: t.contact.phoneLabel,
              display: COMPANY.phone,
              tel: COMPANY.phoneTel,
            },
          ];

  const whatsapps =
    data?.whatsapps?.length > 0
      ? data.whatsapps
      : [
          {
            label: t.contact.whatsappDirect,
            url: data?.whatsappUrl || COMPANY.whatsappUrl,
          },
        ];

  const socials =
    data?.socials?.length > 0
      ? data.socials
      : [
          data?.facebook
            ? { label: "Facebook", url: data.facebook, icon: "facebook" as const }
            : null,
          data?.tiktok
            ? { label: "TikTok", url: data.tiktok, icon: "tiktok" as const }
            : null,
          data?.instagram
            ? { label: "Instagram", url: data.instagram, icon: "instagram" as const }
            : null,
          data?.youtube
            ? { label: "YouTube", url: data.youtube, icon: "youtube" as const }
            : null,
        ].filter(Boolean) as { label: string; url: string; icon: "facebook" | "tiktok" | "instagram" | "youtube" }[];

  const contactBlocks = data?.contactBlocks ?? [];
  const email = data?.email || "";
  const primaryWhatsapp = whatsapps[0]?.url || COMPANY.whatsappUrl;

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
            <span className="text-gradient-gold">
              {data?.contactTitle || t.contact.title}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-brand-text-light sm:text-base">
            {data?.contactSubtitle || t.contact.subtitle}
          </p>
        </motion.div>

        {contactBlocks.length > 0 ? (
          <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {contactBlocks.map((block, i) => (
              <motion.div
                key={`block-${i}-${block.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="rounded-3xl border border-[#D1AC81]/25 bg-brand-surface/70 p-7 backdrop-blur-sm"
                dir={dir}
              >
                {block.title ? (
                  <h3 className="text-lg font-bold text-brand-dark sm:text-xl">{block.title}</h3>
                ) : null}
                {block.body ? (
                  <p className="mt-2 text-sm leading-relaxed text-brand-text-light whitespace-pre-line">
                    {block.body}
                  </p>
                ) : null}
              </motion.div>
            ))}
          </div>
        ) : null}

        <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {branches.map((branch, i) => (
            <motion.div
              key={`${branch.title}-${branch.area}-${i}`}
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
            className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between"
            dir={dir}
          >
            <div className="min-w-0 flex-1 space-y-4">
              {phones.map((phone, i) => (
                <div key={`phone-${i}-${phone.display}`}>
                  <p className="text-sm text-brand-text-light">
                    {phone.label || t.contact.phoneLabel}
                  </p>
                  <a
                    href={phone.tel ? `tel:${phone.tel}` : primaryWhatsapp}
                    className="mt-1 block text-xl font-bold text-brand-dark transition hover:text-[#C3986E] sm:text-2xl"
                    dir="ltr"
                  >
                    {phone.display || phone.tel}
                  </a>
                </div>
              ))}
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="block text-sm text-brand-text-light transition hover:text-[#C3986E]"
                  dir="ltr"
                >
                  {email}
                </a>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {phones.map((phone, i) =>
                phone.tel ? (
                  <a
                    key={`call-${i}`}
                    href={`tel:${phone.tel}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C3986E] to-[#D1AC81] px-7 py-3.5 text-sm font-bold text-[#3E2E1F] shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
                  >
                    <Phone className="h-4 w-4" />
                    {phone.label || t.contact.callNow}
                  </a>
                ) : null
              )}
              {whatsapps.map((wa, i) => (
                <a
                  key={`wa-${i}`}
                  href={wa.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-7 py-3.5 text-sm font-semibold text-[#128C7E] transition hover:scale-[1.02] hover:bg-[#25D366]/18"
                >
                  <MessageCircle className="h-4 w-4" />
                  {wa.label || t.contact.whatsappDirect}
                </a>
              ))}
            </div>

            {socials.length > 0 ? (
              <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                {socials.map((social, i) => (
                  <a
                    key={`social-${i}-${social.url}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label || social.icon}
                    className={socialBtnClass}
                  >
                    <SocialIcon icon={social.icon} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
