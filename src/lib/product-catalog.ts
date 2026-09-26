/** Product catalog media map — paths are root-relative under /public */

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

function imageRange(prefix: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/images/${prefix}${i + 1}.jpeg`
  );
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "electric",
    title: "مظلات متحركة كهربائية",
    images: imageRange("t", 10),
    videos: ["/videos/v3.mp4"],
  },
  {
    id: "manual",
    title: "مظلات متحركة يدوية",
    images: imageRange("y", 10),
    videos: ["/videos/v4.mp4", "/videos/v5.mp4"],
  },
  {
    id: "braccio",
    title: "مظلات براتشو متحركة",
    images: imageRange("k", 15),
    videos: [],
  },
  {
    id: "pyramid",
    title: "مظلات هرمية قماشية",
    images: imageRange("n", 15),
    videos: [],
  },
  {
    id: "sail",
    title: "مظلات شراعية بتصاميم مختلفة",
    images: imageRange("i", 20),
    videos: [
      "/videos/v6.mp4",
      "/videos/v7.mp4",
      "/videos/v8.mp4",
      "/videos/v9.mp4",
      "/videos/v10.mp4",
    ],
    featuredVideo: {
      src: "/videos/v11.mp4",
      title: "تعريف على المظلات الشراعية",
    },
  },
  {
    id: "arched",
    title: "مظلات مقوسة",
    images: imageRange("q", 5),
    videos: [],
  },
];

export const PROJECT_GALLERY_IMAGES = [
  "/images/t1.jpeg",
  "/images/t2.jpeg",
  "/images/q4.jpeg",
  "/images/q3.jpeg",
  "/images/n3.jpeg",
  "/images/n5.jpeg",
  "/images/y3.jpeg",
  "/images/y2.jpeg",
] as const;
