"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import ProductsCatalog from "@/components/products/ProductsCatalog";

export default function ProductsPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div
      id="top"
      className="w-full min-h-screen overflow-x-hidden bg-brand-bg transition-colors duration-300"
    >
      <Header onOpenContact={() => setContactOpen(true)} />
      <main className="pt-20 sm:pt-24">
        <ProductsCatalog />
      </main>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
