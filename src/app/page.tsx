"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Applications from "@/components/Applications";
import ProductSeries from "@/components/ProductSeries";
import Features from "@/components/Features";
import Configurator from "@/components/Configurator";
import Process from "@/components/Process";
import CatalogSection from "@/components/CatalogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

export default function HomePage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div id="top" className="bg-brand-bg transition-colors duration-300">
      <Header onOpenContact={() => setContactOpen(true)} />
      <main>
        <Hero onOpenContact={() => setContactOpen(true)} />
        <Applications />
        <ProductSeries />
        <Features />
        <Configurator />
        <Process />
        <CatalogSection />
        <ContactSection />
      </main>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
