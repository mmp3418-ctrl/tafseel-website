"use client";

import { useApp } from "@/components/providers/AppProviders";
import { asset } from "@/lib/assets";

type CatalogDownloadLinkProps = {
  className?: string;
  label?: string;
};

const DEFAULT_CLASS =
  "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C3986E] to-[#D1AC81] px-6 py-3 font-bold text-[#12100E] shadow-lg transition-all duration-300 hover:scale-105";

export default function CatalogDownloadLink({
  className = DEFAULT_CLASS,
  label,
}: CatalogDownloadLinkProps) {
  const { t } = useApp();

  return (
    <a
      href={asset("/catalog.pdf")}
      download="Tafseel-Shades-Catalog.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <span>{label ?? t.catalog.download}</span>
    </a>
  );
}
