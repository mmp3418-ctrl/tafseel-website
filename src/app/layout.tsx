import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

/** Production GitHub Pages base — inlined at build time via next.config env */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "شركة تفاصيل للمظلات الحديثة | Tafasil Modern Canopies",
  description:
    "شركة تفاصيل للمظلات الحديثة — مظلات معمارية وبرجولات فاخرة في ليبيا.",
  keywords: ["مظلات", "برجولات", "تفاصيل", "ليبيا", "Tafasil"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} dark w-full min-h-screen bg-neutral-950 text-white overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head>
        {/* Stable CSS URL outside `_next` — survives GitHub Pages/Jekyll */}
        <link rel="stylesheet" href={`${BASE}/assets/site.css`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("tafasil-theme");if(t!=="light")document.documentElement.classList.add("dark");else document.documentElement.classList.remove("dark");}catch(e){document.documentElement.classList.add("dark");}})();`,
          }}
        />
      </head>
      <body className="w-full min-h-screen bg-neutral-950 text-white overflow-x-hidden font-sans antialiased transition-colors duration-300">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
