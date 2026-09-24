import type {
  ColorOption,
  ConfigState,
  HardwareOption,
  PriceBreakdown,
  ProductSystem,
} from "./types";

export const COMPANY = {
  nameAr: "شركة تفاصيل للمظلات الحديثة",
  nameEn: "Tafasil",
  shortName: "تفاصيل",
  tagline: "حلول الشتر والمظلات الحديثة",
  logo: "/lo.png",
  heroVideo: "/vo.mp4",
  heroVideoWebm: "/vo.webm",
  /** Local display number */
  phone: "0925896472",
  /** E.164 for tel: links */
  phoneTel: "+218925896472",
  /** Digits only for wa.me */
  whatsapp: "218925896472",
  whatsappUrl: "https://wa.me/218925896472",
  locations: [
    "الفرع الأول: السراج قرب كوبري الثلاجات",
    "الفرع الثاني: المدينة الرياضية المجمع الاستثماري الدور الثاني",
  ],
  social: {
    facebook:
      "https://www.facebook.com/share/1KHFKsvUVA/?mibextid=wwXIfr",
    tiktok: "https://www.tiktok.com/@tafseel541?_r=1&_t=ZS-99xKxD9yyou",
  },
} as const;

export const SYSTEMS: ProductSystem[] = [
  {
    id: "solidroll",
    nameAr: "سوليد رول",
    nameEn: "SolidRoll",
    badge: "السلسلة القياسية",
    description:
      "نظام شتر شفاف كلاسيكي بشرائح ضيقة متراصة ونفاذية ضوء عالية.",
    pricePerM2: 850,
    features: [
      "نفاذية ضوء حتى 88%",
      "طلاء حماية UV بضمان 10 سنوات",
      "بولي كربونات عالي المقاومة",
      "مقاومة حريق B-s1-d0 حتى 120°م",
    ],
  },
  {
    id: "solidplus",
    nameAr: "سوليد بلس",
    nameEn: "SolidPlus",
    badge: "سلسلة توب المحسنة",
    description:
      "ألواح زجاجية شفافة واسعة بإطارات ألمنيوم سميكة للأداء الفاخر.",
    pricePerM2: 1150,
    features: [
      "نفاذية ضوء حتى 88%",
      "مقاومة صدمات معزّزة",
      "عزل حراري وصوتي محسّن",
      "تركيب سريع وأنظمة تشغيل ذكية",
    ],
  },
];

export const HARDWARE: HardwareOption[] = [
  {
    id: "manual",
    nameAr: "تشغيل يدوي",
    description: "نظام سحب يدوي سلس مع قفل أمان",
    priceModifier: 0,
  },
  {
    id: "motor",
    nameAr: "محرك كهربائي",
    description: "محرك هادئ مع ريموت كنترول",
    priceModifier: 450,
  },
  {
    id: "smart",
    nameAr: "نظام ذكي",
    description: "تكامل مع المنزل الذكي وتطبيق الجوال",
    priceModifier: 890,
  },
];

/** Frame color finishes */
export const COLORS: ColorOption[] = [
  { id: "black", nameAr: "أسود مطفي", hex: "#1A1A1A", priceModifier: 0 },
  { id: "white", nameAr: "أبيض ناصع", hex: "#F2F2F0", priceModifier: 0 },
  { id: "anthracite", nameAr: "أنثراسايت", hex: "#3D3D3D", priceModifier: 60 },
  { id: "bronze", nameAr: "برونزي", hex: "#8B7355", priceModifier: 120 },
  { id: "gold", nameAr: "ذهبي معدني", hex: "#D4AF37", priceModifier: 180 },
];

export const DEFAULT_CONFIG: ConfigState = {
  system: "solidroll",
  widthCm: 300,
  heightCm: 250,
  hardware: "motor",
  color: "black",
  openPercent: 24,
};

export function getSystem(id: ConfigState["system"]): ProductSystem {
  return SYSTEMS.find((s) => s.id === id) ?? SYSTEMS[0];
}

export function getHardware(id: ConfigState["hardware"]): HardwareOption {
  return HARDWARE.find((h) => h.id === id) ?? HARDWARE[0];
}

export function getColor(id: ConfigState["color"]): ColorOption {
  return COLORS.find((c) => c.id === id) ?? COLORS[0];
}

export function calculatePrice(config: ConfigState): PriceBreakdown {
  const system = getSystem(config.system);
  const hardware = getHardware(config.hardware);
  const color = getColor(config.color);

  const areaM2 = (config.widthCm / 100) * (config.heightCm / 100);
  const basePrice = areaM2 * system.pricePerM2;
  const hardwareExtra = hardware.priceModifier;
  const colorExtra = color.priceModifier * areaM2;
  const total = Math.round(basePrice + hardwareExtra + colorExtra);

  return {
    areaM2: Math.round(areaM2 * 100) / 100,
    basePrice: Math.round(basePrice),
    hardwareExtra,
    colorExtra: Math.round(colorExtra),
    total,
  };
}

export function formatSAR(amount: number): string {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildWhatsAppMessage(config: ConfigState): string {
  const system = getSystem(config.system);
  const hardware = getHardware(config.hardware);
  const color = getColor(config.color);
  const price = calculatePrice(config);

  return [
    "السلام عليكم،",
    "أرغب في طلب عرض سعر لنظام الشتر الشفاف:",
    "",
    `• النظام المحدد: ${system.nameAr} (${system.nameEn}) — ${system.badge}`,
    `• الأبعاد: العرض ${config.widthCm} سم × الارتفاع ${config.heightCm} سم`,
    `• المساحة: ${price.areaM2} م²`,
    `• الأجهزة: ${hardware.nameAr}`,
    `• لون الإطار: ${color.nameAr}`,
    "",
    "يرجى التواصل معي لترتيب معاينة أو مكالمة.",
  ].join("\n");
}

export function getWhatsAppUrl(config: ConfigState): string {
  const text = encodeURIComponent(buildWhatsAppMessage(config));
  return `https://wa.me/${COMPANY.whatsapp}?text=${text}`;
}
