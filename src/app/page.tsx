"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductSeries from "@/components/ProductSeries";
import Applications from "@/components/Applications";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

/**
 * شركة تفاصيل للمظلات الحديثة — static landing page (GitHub Pages export)
 */
export default function HomePage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div id="top" className="bg-brand-bg transition-colors duration-300">
      <Header onOpenContact={() => setContactOpen(true)} />
      <main>
        <Hero onOpenContact={() => setContactOpen(true)} />
        <ProductSeries />
        <Applications />
        <ContactSection />
      </main>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
