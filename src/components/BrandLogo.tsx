"use client";

import { asset } from "@/lib/assets";

type BrandLogoProps = {
  alt?: string;
  className?: string;
  glow?: boolean;
};

const HEADER_IMG_CLASS =
  "relative h-9 w-auto max-h-12 object-contain drop-shadow-[0_2px_8px_rgba(209,172,129,0.35)] transition-all duration-300 sm:h-11 lg:h-12";

export default function BrandLogo({
  alt = "شركة تفاصيل للمظلات الحديثة",
  className = HEADER_IMG_CLASS,
  glow = true,
}: BrandLogoProps) {
  const src = asset("/lo.png");

  if (!glow) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={className} />
    );
  }

  return (
    <div className="relative flex items-center justify-center py-0.5">
      <div
        className="pointer-events-none absolute -inset-1 rounded-full bg-[#D1AC81]/20 opacity-60 blur-md"
        aria-hidden
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={className} />
    </div>
  );
}
