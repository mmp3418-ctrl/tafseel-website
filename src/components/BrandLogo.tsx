"use client";

type BrandLogoProps = {
  alt?: string;
  className?: string;
  glow?: boolean;
};

/** Compact header-friendly logo sizing (h-11 / ~h-13 / ~h-15) */
const HEADER_IMG_CLASS =
  "relative h-11 w-auto max-h-16 object-contain drop-shadow-[0_2px_8px_rgba(209,172,129,0.35)] transition-all duration-300 sm:h-[3.25rem] lg:h-[3.75rem]";

/**
 * Logo with subtle gold backlight — sized for a compact navbar by default.
 */
export default function BrandLogo({
  alt = "شركة تفاصيل للمظلات الحديثة",
  className = HEADER_IMG_CLASS,
  glow = true,
}: BrandLogoProps) {
  if (!glow) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/lo.png" alt={alt} className={className} />
    );
  }

  return (
    <div className="relative flex items-center justify-center py-0.5">
      <div
        className="pointer-events-none absolute -inset-1 rounded-full bg-[#D1AC81]/20 opacity-60 blur-md"
        aria-hidden
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/lo.png" alt={alt} className={className} />
    </div>
  );
}
