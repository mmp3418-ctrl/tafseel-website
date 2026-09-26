"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import ProjectsGallery from "@/components/projects/ProjectsGallery";

export default function ProjectsPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div
      id="top"
      className="w-full min-h-screen overflow-x-hidden bg-brand-bg transition-colors duration-300"
    >
      <Header onOpenContact={() => setContactOpen(true)} />
      <main className="pt-20 sm:pt-24">
        <ProjectsGallery />
      </main>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
