import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type HomeMedia = {
  mediaUrl: string;
  mediaType: "image" | "video";
  alt?: string;
};

export type HomeFeatured = {
  id?: string;
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

export type ContactBlock = {
  title: string;
  body: string;
};

export type ContactPhone = {
  label: string;
  display: string;
  tel: string;
};

export type ContactWhatsapp = {
  label: string;
  url: string;
};

export type SocialIconId =
  | "facebook"
  | "tiktok"
  | "instagram"
  | "youtube"
  | "whatsapp"
  | "x"
  | "linkedin"
  | "snapchat"
  | "telegram";

export type ContactSocial = {
  label: string;
  url: string;
  icon: SocialIconId;
};

export const SOCIAL_ICON_OPTIONS: { id: SocialIconId; label: string }[] = [
  { id: "facebook", label: "Facebook" },
  { id: "tiktok", label: "TikTok" },
  { id: "instagram", label: "Instagram" },
  { id: "youtube", label: "YouTube" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "x", label: "X / Twitter" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "snapchat", label: "Snapchat" },
  { id: "telegram", label: "Telegram" },
];

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
  /** @deprecated prefer phones[] */
  phone: string;
  /** @deprecated prefer phones[] */
  phoneTel: string;
  email: string;
  /** @deprecated prefer whatsapps[] */
  whatsappUrl: string;
  /** @deprecated prefer socials[] */
  facebook: string;
  /** @deprecated prefer socials[] */
  tiktok: string;
  /** @deprecated prefer socials[] */
  instagram: string;
  /** @deprecated prefer socials[] */
  youtube: string;
  catalogUrl: string;
  customLinkLabel: string;
  customLinkUrl: string;
  branches: HomeBranch[];
  contactBlocks: ContactBlock[];
  phones: ContactPhone[];
  whatsapps: ContactWhatsapp[];
  socials: ContactSocial[];
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

function asFeaturedList(value: unknown): HomeFeatured[] {
  if (!Array.isArray(value)) return [];
  return value.map((item, index) => {
    const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    const mediaUrl = optionalText(row.mediaUrl);
    return {
      id: optionalText(row.id) || `featured-${index}`,
      title: optionalText(row.title),
      description: optionalText(row.description),
      mediaUrl,
      mediaType: mediaType(row.mediaType, mediaUrl),
    };
  });
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

function asContactBlocks(value: unknown): ContactBlock[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
      return {
        title: optionalText(row.title),
        body: optionalText(row.body),
      };
    })
    .filter((item) => item.title || item.body);
}

function asPhones(value: unknown): ContactPhone[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
      return {
        label: optionalText(row.label),
        display: optionalText(row.display),
        tel: optionalText(row.tel),
      };
    })
    .filter((item) => item.display || item.tel);
}

function asWhatsapps(value: unknown): ContactWhatsapp[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
      return {
        label: optionalText(row.label),
        url: optionalText(row.url),
      };
    })
    .filter((item) => item.url);
}

function asSocialIcon(value: unknown): SocialIconId {
  const id = optionalText(value) as SocialIconId;
  return SOCIAL_ICON_OPTIONS.some((option) => option.id === id) ? id : "facebook";
}

function asSocials(value: unknown): ContactSocial[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
      return {
        label: optionalText(row.label),
        url: optionalText(row.url),
        icon: asSocialIcon(row.icon),
      };
    })
    .filter((item) => item.url);
}

export function normalizeWhatsappUrl(raw: string, fallback = ""): string {
  const value = raw.trim();
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value;
  const digits = value.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : fallback;
}

/** Defaults — featured/contact lists start empty for admin-managed content. */
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
  featured: [],
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
  contactBlocks: [],
  phones: [],
  whatsapps: [],
  socials: [],
};

function legacyPhones(data: Record<string, unknown>, base: HomeSettings): ContactPhone[] {
  const list = asPhones(data.phones);
  if (list.length) return list;
  const display = text(data.phone, base.phone);
  const tel = text(data.phoneTel, base.phoneTel);
  return display || tel ? [{ label: "هاتف", display, tel }] : [];
}

function legacyWhatsapps(data: Record<string, unknown>, base: HomeSettings): ContactWhatsapp[] {
  const list = asWhatsapps(data.whatsapps);
  if (list.length) {
    return list.map((item) => ({
      ...item,
      url: normalizeWhatsappUrl(item.url, base.whatsappUrl),
    }));
  }
  const url = normalizeWhatsappUrl(text(data.whatsappUrl, base.whatsappUrl), base.whatsappUrl);
  return url ? [{ label: "واتساب", url }] : [];
}

function legacySocials(data: Record<string, unknown>, base: HomeSettings): ContactSocial[] {
  const list = asSocials(data.socials);
  if (list.length) return list;
  const items: ContactSocial[] = [];
  const facebook = text(data.facebook, base.facebook);
  const tiktok = text(data.tiktok, base.tiktok);
  const instagram = optionalText(data.instagram) || base.instagram;
  const youtube = optionalText(data.youtube) || base.youtube;
  if (facebook) items.push({ label: "Facebook", url: facebook, icon: "facebook" });
  if (tiktok) items.push({ label: "TikTok", url: tiktok, icon: "tiktok" });
  if (instagram) items.push({ label: "Instagram", url: instagram, icon: "instagram" });
  if (youtube) items.push({ label: "YouTube", url: youtube, icon: "youtube" });
  return items;
}

export function mergeHomeSettings(raw: Record<string, unknown> | undefined): HomeSettings {
  const base = DEFAULT_HOME_SETTINGS;
  const data = raw ?? {};
  const phones = legacyPhones(data, base);
  const whatsapps = legacyWhatsapps(data, base);
  const socials = legacySocials(data, base);
  const primaryPhone = phones[0];
  const primaryWhatsapp = whatsapps[0];
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
    featured: asFeaturedList(data.featured),
    galleryTitle: text(data.galleryTitle, base.galleryTitle),
    gallery: asGallery(data.gallery),
    contactTitle: text(data.contactTitle, base.contactTitle),
    contactSubtitle: text(data.contactSubtitle, base.contactSubtitle),
    phone: primaryPhone?.display || text(data.phone, base.phone),
    phoneTel: primaryPhone?.tel || text(data.phoneTel, base.phoneTel),
    email: optionalText(data.email),
    whatsappUrl: primaryWhatsapp?.url || normalizeWhatsappUrl(text(data.whatsappUrl, base.whatsappUrl), base.whatsappUrl),
    facebook: socials.find((item) => item.icon === "facebook")?.url || text(data.facebook, base.facebook),
    tiktok: socials.find((item) => item.icon === "tiktok")?.url || text(data.tiktok, base.tiktok),
    instagram: socials.find((item) => item.icon === "instagram")?.url || optionalText(data.instagram),
    youtube: socials.find((item) => item.icon === "youtube")?.url || optionalText(data.youtube),
    catalogUrl: optionalText(data.catalogUrl),
    customLinkLabel: optionalText(data.customLinkLabel),
    customLinkUrl: optionalText(data.customLinkUrl),
    branches: asBranches(data.branches, base.branches),
    contactBlocks: asContactBlocks(data.contactBlocks),
    phones,
    whatsapps,
    socials,
  };
}

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
