import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type HomeMedia = {
  mediaUrl: string;
  mediaType: "image" | "video";
  alt?: string;
};

export type HomeFeatured = {
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: "image" | "video";
};

export type HomeBranch = {
  title: string;
  area: string;
  detail: string;
};

export type HomeSettings = {
  companyNameAr: string;
  companyNameEn: string;
  footerBlurb: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroVideoUrl: string;
  ctaWhatsapp: string;
  ctaProjects: string;
  productsTitle: string;
  productsSubtitle: string;
  orderLabel: string;
  featured: HomeFeatured[];
  galleryTitle: string;
  gallery: HomeMedia[];
  contactTitle: string;
  contactSubtitle: string;
  phone: string;
  phoneTel: string;
  email: string;
  whatsappUrl: string;
  facebook: string;
  tiktok: string;
  instagram: string;
  youtube: string;
  catalogUrl: string;
  customLinkLabel: string;
  customLinkUrl: string;
  branches: HomeBranch[];
};

export const HOME_SETTINGS_DOC = "main";

function text(value: unknown, fallback: string) {
  const next = typeof value === "string" ? value.trim() : "";
  return next || fallback;
}

function optionalText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function mediaType(value: unknown, url: string): "image" | "video" {
  if (value === "video" || /\.(mp4|webm|ogg|mov|m4v)(?:$|[?#])/i.test(url)) {
    return "video";
  }
  return "image";
}

function asFeatured(value: unknown, fallback: HomeFeatured): HomeFeatured {
  const row = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const mediaUrl = text(row.mediaUrl, "");
  return {
    title: text(row.title, fallback.title),
    description: text(row.description, fallback.description),
    mediaUrl,
    mediaType: mediaType(row.mediaType, mediaUrl),
  };
}

function asGallery(value: unknown): HomeMedia[] {
  if (!Array.isArray(value)) return [];
  const items: HomeMedia[] = [];
  for (const item of value) {
    const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    const mediaUrl = text(row.mediaUrl, "");
    if (!mediaUrl) continue;
    items.push({
      mediaUrl,
      mediaType: mediaType(row.mediaType, mediaUrl),
      alt: text(row.alt, ""),
    });
  }
  return items;
}

function asBranches(value: unknown, fallback: HomeBranch[]): HomeBranch[] {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const rows = value
    .map((item, index) => {
      const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
      const base = fallback[index] ?? { title: "", area: "", detail: "" };
      return {
        title: text(row.title, base.title),
        area: text(row.area, base.area),
        detail: text(row.detail, base.detail),
      };
    })
    .filter((item) => item.title || item.area || item.detail);
  return rows.length ? rows : fallback;
}

export function normalizeWhatsappUrl(raw: string, fallback: string): string {
  const value = raw.trim();
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value;
  const digits = value.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : fallback;
}

/** Text/contact defaults — media and optional links come from the admin panel. */
export const DEFAULT_HOME_SETTINGS: HomeSettings = {
  companyNameAr: "شركة تفاصيل للمظلات الحديثة",
  companyNameEn: "Tafasil",
  footerBlurb:
    "نبتكر الظل لنصنع الفخامة المعمارية. حلول مظلات وبرجولات بتركيب هندسي محترف في ليبيا.",
  heroBadge: "الفخامة والابتكار المعماري للمظلات",
  heroTitle: "نبتكر الظل.. لنصنع الفخامة المعمارية",
  heroSubtitle:
    "أنظمة مظلات حديثة وهياكل معمارية متطورة مصممة بأعلى معايير الأناقة والمتانة للمنازل والمنشآت الفاخرة في ليبيا.",
  heroVideoUrl: "",
  ctaWhatsapp: "تواصل معنا عبر واتساب",
  ctaProjects: "استكشف مشاريعنا",
  productsTitle: "سلسلة المنتجات",
  productsSubtitle: "اختر من بين تشكيلتنا الفاخرة المحدثة للمظلات المعمارية",
  orderLabel: "اطلب الآن",
  featured: [
    {
      title: "سلسلة المظلات المعمارية المبتكرة",
      description:
        "تصاميم متطورة ومقاومة للعوامل الجوية تمنح مساحتك الخارجية مظهرًا معماريًا أنيقًا.",
      mediaUrl: "",
      mediaType: "image",
    },
    {
      title: "سلسلة التظليل العصري والبرجولات",
      description:
        "حلول تظليل حديثة توفر أقصى درجات الراحة والحماية مع لمسات تصميمية فاخرة.",
      mediaUrl: "",
      mediaType: "image",
    },
  ],
  galleryTitle: "معرض أعمالنا الحصرية",
  gallery: [],
  contactTitle: "تواصل معنا",
  contactSubtitle:
    "زر أحد فرعينا أو راسلنا مباشرة — نساعدك في القياس والمعاينة وعرض السعر.",
  phone: "0925896472",
  phoneTel: "+218925896472",
  email: "",
  whatsappUrl: "https://wa.me/218925896472",
  facebook: "https://www.facebook.com/share/1KHFKsvUVA/?mibextid=wwXIfr",
  tiktok: "https://www.tiktok.com/@tafseel541?_r=1&_t=ZS-99xKxD9yyou",
  instagram: "",
  youtube: "",
  catalogUrl: "",
  customLinkLabel: "",
  customLinkUrl: "",
  branches: [
    { title: "الفرع الأول", area: "السراج", detail: "قرب كوبري الثلاجات" },
    {
      title: "الفرع الثاني",
      area: "المدينة الرياضية",
      detail: "المجمع الاستثماري — الدور الثاني",
    },
  ],
};

export function mergeHomeSettings(raw: Record<string, unknown> | undefined): HomeSettings {
  const base = DEFAULT_HOME_SETTINGS;
  const data = raw ?? {};
  const featuredRaw = Array.isArray(data.featured) ? data.featured : [];
  const whatsappUrl = normalizeWhatsappUrl(
    text(data.whatsappUrl, base.whatsappUrl),
    base.whatsappUrl
  );
  return {
    companyNameAr: text(data.companyNameAr, base.companyNameAr),
    companyNameEn: text(data.companyNameEn, base.companyNameEn),
    footerBlurb: text(data.footerBlurb, base.footerBlurb),
    heroBadge: text(data.heroBadge, base.heroBadge),
    heroTitle: text(data.heroTitle, base.heroTitle),
    heroSubtitle: text(data.heroSubtitle, base.heroSubtitle),
    heroVideoUrl: text(data.heroVideoUrl, ""),
    ctaWhatsapp: text(data.ctaWhatsapp, base.ctaWhatsapp),
    ctaProjects: text(data.ctaProjects, base.ctaProjects),
    productsTitle: text(data.productsTitle, base.productsTitle),
    productsSubtitle: text(data.productsSubtitle, base.productsSubtitle),
    orderLabel: text(data.orderLabel, base.orderLabel),
    featured: [0, 1].map((index) => asFeatured(featuredRaw[index], base.featured[index])),
    galleryTitle: text(data.galleryTitle, base.galleryTitle),
    gallery: asGallery(data.gallery),
    contactTitle: text(data.contactTitle, base.contactTitle),
    contactSubtitle: text(data.contactSubtitle, base.contactSubtitle),
    phone: text(data.phone, base.phone),
    phoneTel: text(data.phoneTel, base.phoneTel),
    email: optionalText(data.email),
    whatsappUrl,
    facebook: text(data.facebook, base.facebook),
    tiktok: text(data.tiktok, base.tiktok),
    instagram: optionalText(data.instagram),
    youtube: optionalText(data.youtube),
    catalogUrl: optionalText(data.catalogUrl),
    customLinkLabel: optionalText(data.customLinkLabel),
    customLinkUrl: optionalText(data.customLinkUrl),
    branches: asBranches(data.branches, base.branches),
  };
}

/** Loads site/home settings from Firestore; falls back to defaults when missing. */
export async function loadHomeSettings(): Promise<HomeSettings> {
  try {
    const snapshot = await getDoc(doc(db, "home_settings", HOME_SETTINGS_DOC));
    if (!snapshot.exists()) return mergeHomeSettings(undefined);
    return mergeHomeSettings(snapshot.data() as Record<string, unknown>);
  } catch (error) {
    console.error("home_settings load failed:", error);
    return mergeHomeSettings(undefined);
  }
}

export function resolveMediaSrc(url: string): string {
  const value = url.trim();
  if (!value) return "";
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  return value.startsWith("/") ? value : `/${value}`;
}

export function branchLocationLine(branch: HomeBranch): string {
  const parts = [branch.title, branch.area, branch.detail].filter(Boolean);
  if (parts.length >= 2) return `${parts[0]}: ${parts.slice(1).join(" ")}`;
  return parts.join(" ");
}
