"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductSeries from "@/components/ProductSeries";
import Applications from "@/components/Applications";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useApp } from "@/components/providers/AppProviders";

/**
 * شركة تفاصيل للمظلات الحديثة — homepage content from Firestore `home_settings/main`
 */
export default function HomePage() {
  const [contactOpen, setContactOpen] = useState(false);
  const { site, siteReady } = useApp();
  const mounted = useIsMounted();

  return (
    <div
      id="top"
      className="w-full min-h-screen overflow-x-hidden bg-brand-bg transition-colors duration-300"
      data-mounted={mounted ? "true" : "false"}
    >
      <Header onOpenContact={() => setContactOpen(true)} />
      <main>
        <Hero home={site} homeReady={siteReady} onOpenContact={() => setContactOpen(true)} />
        <ProductSeries home={site} homeReady={siteReady} />
        <Applications home={site} homeReady={siteReady} />
        <ContactSection home={site} />
      </main>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
