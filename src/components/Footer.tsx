"use client";

import { useEffect, useMemo, useState, type SVGProps } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { COMPANY } from "@/lib/products";
import { branchLocationLine } from "@/lib/home-settings";
import { useApp } from "@/components/providers/AppProviders";
import BrandLogo from "@/components/BrandLogo";
import CatalogDownloadLink from "@/components/CatalogDownloadLink";

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

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
    </svg>
  );
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.2 3.5-6.2 3.5z" />
    </svg>
  );
}

const socialBtnClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-[#C3986E]/40 bg-[#C3986E]/10 text-[#D1AC81] transition hover:scale-105 hover:border-[#C3986E] hover:bg-[#C3986E] hover:text-[#FAFBF9]";

export default function Footer() {
  const { t, locale, dir, site } = useApp();
  const [showTop, setShowTop] = useState(false);

  const brandName = locale === "ar" ? site.companyNameAr : site.companyNameEn;
  const phone = site.phone || COMPANY.phone;
  const phoneTel = site.phoneTel || COMPANY.phoneTel;
  const locations =
    site.branches?.length > 0
      ? site.branches.map(branchLocationLine)
      : [...COMPANY.locations];

  const quickLinks = useMemo(() => {
    const links: { href: string; label: string }[] = [
      { href: "/products/", label: t?.nav?.products ?? "المنتجات" },
      { href: "/projects/", label: t?.nav?.projects ?? "المشاريع" },
      { href: "/customize/", label: t?.nav?.custom ?? "التخصيص" },
      { href: "/#contact", label: t?.nav?.contact ?? "تواصل" },
    ];
    if (site.customLinkUrl && site.customLinkLabel) {
      links.push({ href: site.customLinkUrl, label: site.customLinkLabel });
    }
    return links;
  }, [t, site.customLinkUrl, site.customLinkLabel]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const top = document.getElementById("top");
    if (top) top.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="relative bg-[#12100E] text-[#FAFBF9]">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D1AC81] to-transparent" />

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div
            className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10"
            dir={dir}
          >
            <div className="lg:col-span-5">
              <Link
                href="/"
                className="group inline-flex items-center rounded-xl bg-transparent p-1 transition hover:scale-[1.02]"
              >
                <BrandLogo
                  alt={brandName || COMPANY.nameAr}
                  className="relative h-14 w-auto max-h-20 object-contain drop-shadow-[0_2px_8px_rgba(209,172,129,0.35)] transition-all duration-300 sm:h-16 lg:h-20"
                />
              </Link>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#E2E8F0] drop-shadow-sm">
                {brandName || COMPANY.nameAr} — {site.footerBlurb || t.footer.blurb}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {site.facebook ? (
                  <a
                    href={site.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className={socialBtnClass}
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                ) : null}
                {site.tiktok ? (
                  <a
                    href={site.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className={socialBtnClass}
                  >
                    <TikTokIcon className="h-4 w-4" />
                  </a>
                ) : null}
                {site.instagram ? (
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className={socialBtnClass}
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                ) : null}
                {site.youtube ? (
                  <a
                    href={site.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className={socialBtnClass}
                  >
                    <YoutubeIcon className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </div>

            <div className="lg:col-span-3">
              <p className="mb-4 text-xs font-semibold tracking-wide text-[#D1AC81]">
                {t.footer.quickLinks}
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
                {quickLinks.map((link) => {
                  const external = /^https?:\/\//i.test(link.href);
                  return (
                    <li key={`${link.href}-${link.label}`}>
                      {external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E2E8F0] transition hover:text-[#D1AC81]"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-[#E2E8F0] transition hover:text-[#D1AC81]"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <p className="mb-4 text-xs font-semibold tracking-wide text-[#D1AC81]">
                {t.footer.directContact}
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href={`tel:${phoneTel}`}
                    className="font-medium text-[#FFFFFF] transition hover:text-[#D1AC81]"
                    dir="ltr"
                  >
                    {phone}
                  </a>
                </li>
                {site.email ? (
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="font-medium text-[#FFFFFF] transition hover:text-[#D1AC81]"
                      dir="ltr"
                    >
                      {site.email}
                    </a>
                  </li>
                ) : null}
                {locations.map((loc) => (
                  <li key={loc} className="leading-relaxed text-[#E2E8F0]/90">
                    {loc}
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <CatalogDownloadLink className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C3986E] to-[#D1AC81] px-5 py-2.5 text-sm font-bold text-[#12100E] shadow-lg transition-all duration-300 hover:scale-105" />
              </div>
              <p className="mt-4 inline-flex rounded-full border border-[#D1AC81]/40 bg-[#C3986E]/15 px-3 py-1 text-[11px] text-[#D1AC81]">
                {t.footer.craft}
              </p>
            </div>
          </div>

          <div
            className="mt-14 flex flex-col gap-3 border-t border-[#C3986E]/25 pt-6 text-xs text-[#E2E8F0] sm:flex-row sm:items-center sm:justify-between"
            dir={dir}
          >
            <p className="text-[#FAFBF9]">
              {brandName || (locale === "ar" ? COMPANY.nameAr : COMPANY.shortName)}
            </p>
            <p>
              © {new Date().getFullYear()} {site.companyNameEn || COMPANY.shortName}.{" "}
              {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="fixed bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#D1AC81]/50 bg-[#1A1410] text-[#D1AC81] shadow-xl transition hover:border-[#C3986E] hover:bg-[#C3986E] hover:text-[#FAFBF9] sm:bottom-8 ltr:left-6 ltr:sm:left-8 rtl:right-6 rtl:sm:right-8"
            aria-label={t.a11y.scrollTop}
          >
            <ArrowUp className="h-5 w-5" strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
