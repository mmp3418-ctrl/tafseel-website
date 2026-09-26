/**
 * Product / project media map.
 * Paths are root-relative under /public; `asset()` / PublicMediaImg prepend basePath (/tafseel-website).
 * All images use the `.jpeg` extension explicitly.
 */

export type ProductCategoryId =
  | "electric"
  | "manual"
  | "braccio"
  | "pyramid"
  | "sail"
  | "arched";

export type ProductCategory = {
  id: ProductCategoryId;
  title: string;
  images: string[];
  videos: string[];
  featuredVideo?: { src: string; title: string };
};

const img = (...files: string[]) => files.map((f) => `/images/${f}`);
const vid = (...files: string[]) => files.map((f) => `/videos/${f}`);

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "electric",
    title: "مظلات متحركة كهربائية",
    images: img(
      "t1.jpeg",
      "t2.jpeg",
      "t3.jpeg",
      "t4.jpeg",
      "t5.jpeg",
      "t6.jpeg",
      "t7.jpeg",
      "t8.jpeg",
      "t9.jpeg",
      "t10.jpeg"
    ),
    videos: vid("v3.mp4"),
  },
  {
    id: "manual",
    title: "مظلات متحركة يدوية",
    images: img(
      "y1.jpeg",
      "y2.jpeg",
      "y3.jpeg",
      "y4.jpeg",
      "y5.jpeg",
      "y6.jpeg",
      "y7.jpeg",
      "y8.jpeg",
      "y9.jpeg",
      "y10.jpeg"
    ),
    videos: vid("v4.mp4", "v5.mp4"),
  },
  {
    id: "braccio",
    title: "مظلات براتشو متحركة",
    images: img(
      "k1.jpeg",
      "k2.jpeg",
      "k3.jpeg",
      "k4.jpeg",
      "k5.jpeg",
      "k6.jpeg",
      "k7.jpeg",
      "k8.jpeg",
      "k9.jpeg",
      "k10.jpeg",
      "k11.jpeg",
      "k12.jpeg",
      "k13.jpeg",
      "k14.jpeg",
      "k15.jpeg"
    ),
    videos: [],
  },
  {
    id: "pyramid",
    title: "مظلات هرمية قماشية",
    images: img(
      "n1.jpeg",
      "n2.jpeg",
      "n3.jpeg",
      "n4.jpeg",
      "n5.jpeg",
      "n6.jpeg",
      "n7.jpeg",
      "n8.jpeg",
      "n9.jpeg",
      "n10.jpeg",
      "n11.jpeg",
      "n12.jpeg",
      "n13.jpeg",
      "n14.jpeg",
      "n15.jpeg"
    ),
    videos: [],
  },
  {
    id: "sail",
    title: "مظلات شراعية بتصاميم مختلفة",
    images: img(
      "i1.jpeg",
      "i2.jpeg",
      "i3.jpeg",
      "i4.jpeg",
      "i5.jpeg",
      "i6.jpeg",
      "i7.jpeg",
      "i8.jpeg",
      "i9.jpeg",
      "i10.jpeg",
      "i11.jpeg",
      "i12.jpeg",
      "i13.jpeg",
      "i14.jpeg",
      "i15.jpeg",
      "i16.jpeg",
      "i17.jpeg",
      "i18.jpeg",
      "i19.jpeg",
      "i20.jpeg"
    ),
    videos: vid("v6.mp4", "v7.mp4", "v8.mp4", "v9.mp4", "v10.mp4"),
    featuredVideo: {
      src: "/videos/v11.mp4",
      title: "تعريف على المظلات الشراعية",
    },
  },
  {
    id: "arched",
    title: "مظلات مقوسة",
    images: img("q1.jpeg", "q2.jpeg", "q3.jpeg", "q4.jpeg", "q5.jpeg"),
    videos: [],
  },
];

/** Homepage featured product cards — primary showcase (lowercase .jpeg) */
export const HOMEPAGE_FEATURED_IMAGES = [
  "/images/y1.jpeg",
  "/images/i1.jpeg",
] as const;

/** Projects gallery — filenames resolve under /images/ via PublicMediaImg */
export const PROJECT_GALLERY_IMAGES = [
  "t1.jpeg",
  "t2.jpeg",
  "q4.jpeg",
  "q3.jpeg",
  "n3.jpeg",
  "n5.jpeg",
  "y3.jpeg",
  "y2.jpeg",
] as const;
