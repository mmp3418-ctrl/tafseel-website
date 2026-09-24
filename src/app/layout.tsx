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
      className={`${cairo.variable} dark h-full w-full overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("tafasil-theme");if(t!=="light")document.documentElement.classList.add("dark");else document.documentElement.classList.remove("dark");}catch(e){document.documentElement.classList.add("dark");}})();`,
          }}
        />
      </head>
      <body className="min-h-screen w-full overflow-x-hidden bg-neutral-950 font-sans text-white antialiased transition-colors duration-300">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
