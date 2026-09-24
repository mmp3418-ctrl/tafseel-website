"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircle, Moon, Sun, X } from "lucide-react";
import { COMPANY } from "@/lib/products";
import { useApp } from "@/components/providers/AppProviders";
import BrandLogo from "@/components/BrandLogo";
import CatalogDownloadLink from "@/components/CatalogDownloadLink";

interface HeaderProps {
  onOpenContact: () => void;
}

export default function Header({ onOpenContact }: HeaderProps) {
  const { t, locale, theme, toggleLocale, toggleTheme, dir } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#hero");

  const navLinks = useMemo(
    () => [
      { href: "#hero", label: t.nav.home },
      { href: "#products", label: t.nav.products },
      { href: "#applications", label: t.nav.projects },
      { href: "#contact", label: t.nav.contact },
    ],
    [t]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveHref(`#${id}`);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [navLinks]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <header
        className={`pointer-events-auto mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-[#D1AC81]/20 bg-[#1A1612]/80 px-6 py-2.5 shadow-2xl backdrop-blur-xl transition-all duration-300 sm:py-3 ${
          scrolled ? "shadow-[0_20px_50px_rgba(0,0,0,0.45)]" : ""
        }`}
      >
        <a href="#hero" className="group relative z-10 flex shrink-0 items-center">
          <BrandLogo
            alt={locale === "ar" ? COMPANY.nameAr : COMPANY.shortName}
          />
        </a>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex"
          dir={dir}
        >
          {navLinks.map((link) => {
            const active = activeHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className="group relative px-3.5 py-2 text-[13px] font-medium transition-colors"
              >
                <span
                  className={
                    active
                      ? "text-[#FAFBF9]"
                      : "text-[#E2E8F0]/75 group-hover:text-[#D1AC81]"
                  }
                >
                  {link.label}
                </span>
                <span
                  className={`absolute inset-x-3 bottom-1 h-[2px] origin-center rounded-full bg-[#C3986E] transition-all duration-300 ${
                    active
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className="flex items-center rounded-full border border-[#D1AC81]/25 bg-[#12100E]/60 p-0.5 text-[11px] font-semibold"
            role="group"
            aria-label={t.a11y.lang}
          >
            <button
              type="button"
              onClick={() => locale !== "ar" && toggleLocale()}
              className={`rounded-full px-2.5 py-1.5 transition ${
                locale === "ar"
                  ? "bg-[#C3986E] text-[#12100E] shadow-sm"
                  : "text-[#E2E8F0]/70 hover:text-[#D1AC81]"
              }`}
            >
              AR
            </button>
            <button
              type="button"
              onClick={() => locale !== "en" && toggleLocale()}
              className={`rounded-full px-2.5 py-1.5 transition ${
                locale === "en"
                  ? "bg-[#C3986E] text-[#12100E] shadow-sm"
                  : "text-[#E2E8F0]/70 hover:text-[#D1AC81]"
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.a11y.theme}
            className="rounded-full border border-[#D1AC81]/25 p-2 text-[#D1AC81] transition hover:scale-105 hover:border-[#C3986E] hover:bg-[#C3986E]/10"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <Moon className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>

          <a
            href={COMPANY.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#C3986E] to-[#D1AC81] px-5 py-2 text-[13px] font-bold text-[#12100E] shadow-lg transition-all hover:scale-105 sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            {t.nav.whatsapp}
          </a>

          <CatalogDownloadLink
            className="hidden items-center gap-2 rounded-full border border-[#D1AC81]/30 bg-[#C3986E]/10 px-4 py-2 text-[12px] font-bold text-[#D1AC81] transition hover:scale-105 hover:border-[#C3986E] hover:bg-[#C3986E]/20 md:inline-flex"
          />

          <button
            type="button"
            onClick={onOpenContact}
            className="hidden rounded-full border border-[#D1AC81]/30 px-4 py-2 text-[12px] font-medium text-[#FAFBF9] transition hover:scale-[1.02] hover:border-[#C3986E] hover:bg-[#C3986E]/10 xl:inline-flex"
          >
            {t.nav.quote}
          </button>

          <button
            type="button"
            className="rounded-full p-2 text-[#FAFBF9] transition hover:bg-[#C3986E]/10 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t.a11y.menu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-auto mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-[#D1AC81]/20 bg-[#1A1612]/95 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col px-4 py-3" dir={dir}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`border-b border-[#D1AC81]/15 py-3.5 text-[14px] last:border-0 ${
                    activeHref === link.href
                      ? "font-semibold text-[#FAFBF9]"
                      : "text-[#E2E8F0]/80 hover:text-[#D1AC81]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <CatalogDownloadLink
                className="mt-3 mb-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C3986E] to-[#D1AC81] px-6 py-3 font-bold text-[#12100E] shadow-lg transition-all duration-300 hover:scale-105"
              />
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mb-1 flex items-center justify-center gap-2 rounded-full border border-[#D1AC81]/30 py-3 text-[13px] font-semibold text-[#D1AC81]"
              >
                <MessageCircle className="h-4 w-4" />
                {t.nav.whatsapp}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
