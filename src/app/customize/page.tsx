"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Configurator from "@/components/Configurator";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

/**
 * Product customizer / configurator — statically exported at /customize/
 */
export default function CustomizePage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div
      id="top"
      className="w-full min-h-screen overflow-x-hidden bg-brand-bg transition-colors duration-300"
    >
      <Header onOpenContact={() => setContactOpen(true)} />
      <main className="pt-20 sm:pt-24">
        <Configurator />
      </main>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
