"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import ImageCarousel from "@/components/products/ImageCarousel";
import { normalizeProductMedia } from "@/lib/product-media";
import { readCache, writeCache } from "@/lib/session-cache";

type FirestoreProduct = {
  id: string;
  title: string;
  category: string;
  description: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  images: string[];
};

type FirestoreCategory = {
  id: string;
  name: string;
};

const ALL = "__all__";
const PRODUCTS_CACHE = "catalog_products_v2";
const CATEGORIES_CACHE = "catalog_categories_v2";

function isVideoProduct(item: FirestoreProduct): boolean {
  return item.mediaType === "video" && Boolean(item.mediaUrl) && item.images.length === 0;
}

function VideoPreview({ mediaUrl, title }: { mediaUrl: string; title: string }) {
  if (!mediaUrl) {
    return (
      <div className="flex h-full min-h-[11rem] items-center justify-center bg-[#1A1612] text-xs text-neutral-500">
        لا توجد وسائط
      </div>
    );
  }

  return (
    <video
      src={mediaUrl}
      controls
      playsInline
      preload="none"
      className="h-full w-full object-cover"
      aria-label={title}
    />
  );
}

function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-[#D1AC81]/15 bg-[#241E18]"
        >
          <div className="aspect-[16/11] animate-pulse bg-[#1A1612]" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-20 animate-pulse rounded-full bg-[#2A231C]" />
            <div className="h-6 w-3/4 animate-pulse rounded-lg bg-[#2A231C]" />
            <div className="h-3 w-full animate-pulse rounded bg-[#2A231C]/80" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-[#2A231C]/60" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-3xl border border-dashed border-[#D1AC81]/30 bg-[#241E18]/50 px-6 py-16 text-center">
      <div className="h-14 w-14 rounded-2xl border border-dashed border-[#D1AC81]/25 bg-[#1A1612]" />
      <p className="text-sm text-brand-text-light sm:text-base">{message}</p>
    </div>
  );
}

export default function ProductsCatalog() {
  const [categories, setCategories] = useState<FirestoreCategory[]>(
    () => readCache<FirestoreCategory[]>(CATEGORIES_CACHE) ?? []
  );
  const [products, setProducts] = useState<FirestoreProduct[]>(
    () => readCache<FirestoreProduct[]>(PRODUCTS_CACHE) ?? []
  );
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [loading, setLoading] = useState(() => !readCache(PRODUCTS_CACHE));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const hasCache = Boolean(readCache(PRODUCTS_CACHE));
      if (!hasCache) setLoading(true);
      setError(null);
      try {
        const loadProducts = async () => {
          try {
            return (await getDocs(query(collection(db, "products"), orderBy("createdAt", "desc")))).docs;
          } catch {
            const snap = await getDocs(collection(db, "products"));
            return [...snap.docs].sort((a, b) => {
              const aTime = a.data().createdAt?.toMillis?.() ?? 0;
              const bTime = b.data().createdAt?.toMillis?.() ?? 0;
              return bTime - aTime;
            });
          }
        };

        const [catSnap, prodDocs] = await Promise.all([
          getDocs(collection(db, "categories")),
          loadProducts(),
        ]);

        if (cancelled) return;

        const cats: FirestoreCategory[] = catSnap.docs
          .map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              name: String(data.name ?? data.title ?? "").trim(),
            };
          })
          .filter((c) => c.name)
          .sort((a, b) => a.name.localeCompare(b.name, "ar"));

        const items: FirestoreProduct[] = prodDocs.map((docSnap) => {
          const data = docSnap.data() as Record<string, unknown>;
          const media = normalizeProductMedia(data);
          return {
            id: docSnap.id,
            title: String(data.title ?? ""),
            category: String(data.category ?? ""),
            description: String(data.description ?? ""),
            mediaUrl: media.mediaUrl,
            mediaType: media.mediaType,
            images: media.images,
          };
        });

        setCategories(cats);
        setProducts(items);
        writeCache(CATEGORIES_CACHE, cats);
        writeCache(PRODUCTS_CACHE, items);
      } catch (err) {
        console.error("Failed to load products/categories:", err);
        if (!cancelled && !products.length) {
          setError("تعذر تحميل المنتجات. حاول مرة أخرى لاحقاً.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === ALL) return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  const { imagesList, videosList } = useMemo(() => {
    const images: FirestoreProduct[] = [];
    const videos: FirestoreProduct[] = [];
    filtered.forEach((item) => {
      if (isVideoProduct(item)) videos.push(item);
      else images.push(item);
    });
    return { imagesList: images, videosList: videos };
  }, [filtered]);

  const tabs = useMemo(
    () => [{ id: ALL, name: "الكل" }, ...categories.map((c) => ({ id: c.name, name: c.name }))],
    [categories]
  );

  const renderCard = (item: FirestoreProduct, index: number, mode: "image" | "video") => (
    <motion.article
      key={item.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.24), duration: 0.35 }}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(209,172,129,0.2)] bg-[#241E18] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C3986E] hover:shadow-xl"
      style={{ contentVisibility: "auto", containIntrinsicSize: "420px" }}
    >
      <div className="relative overflow-hidden bg-[#1A1612]">
        {mode === "video" ? (
          <div className="aspect-[16/11]">
            <VideoPreview mediaUrl={item.mediaUrl} title={item.title} />
          </div>
        ) : (
          <ImageCarousel
            images={item.images.length ? item.images : item.mediaUrl ? [item.mediaUrl] : []}
            alt={item.title || "منتج"}
            compact
          />
        )}
        {mode === "image" && item.images.length > 1 ? (
          <span className="pointer-events-none absolute top-2 left-2 z-20 rounded-full border border-[#D1AC81]/35 bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-[#D1AC81] backdrop-blur-md">
            {item.images.length} صور
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4 sm:p-5" dir="rtl">
        {item.category ? (
          <span className="inline-flex w-fit rounded-full border border-[#D1AC81]/30 px-2.5 py-0.5 text-xs font-semibold text-[#D1AC81]">
            {item.category}
          </span>
        ) : null}
        <h2 className="text-lg font-bold leading-snug text-[#FAFBF9] sm:text-xl">{item.title}</h2>
        {item.description ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-[#E2E8F0]/85">{item.description}</p>
        ) : null}
      </div>
    </motion.article>
  );

  return (
    <section className="relative bg-brand-bg px-4 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <span className="brand-badge">✦ المنتجات</span>
          <h1 className="mt-4 text-3xl font-bold text-brand-dark sm:text-4xl lg:text-5xl">
            <span className="text-gradient-gold">تشكيلة المظلات</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-brand-text-light sm:text-base">
            تصفح المنتجات حسب التصنيف مع صور وفيديوهات محدثة مباشرة من المعرض.
          </p>
        </div>

        {loading ? (
          <CatalogSkeleton />
        ) : error ? (
          <EmptyState message={error} />
        ) : (
          <>
            {tabs.length > 1 ? (
              <div
                className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-10 sm:gap-3"
                role="tablist"
                aria-label="فئات المنتجات"
                dir="rtl"
              >
                {tabs.map((tab) => {
                  const selected = activeCategory === tab.id;
                  const count =
                    tab.id === ALL
                      ? products.length
                      : products.filter((p) => p.category === tab.id).length;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveCategory(tab.id)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                        selected
                          ? "bg-gradient-to-r from-[#C3986E] to-[#D1AC81] text-[#12100E] shadow-lg"
                          : "border border-[#D1AC81]/25 bg-[#241E18] text-[#E2E8F0] hover:border-[#C3986E] hover:text-[#D1AC81]"
                      }`}
                    >
                      {tab.name}
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${
                          selected ? "bg-black/15 text-[#12100E]" : "bg-[#1A1612] text-[#D1AC81]"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            {filtered.length === 0 ? (
              <EmptyState message="لا توجد منتجات في هذا التصنيف حالياً." />
            ) : (
              <div className="space-y-12 sm:space-y-16">
                {imagesList.length > 0 ? (
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 border-r-4 border-[#C3986E] pr-3" dir="rtl">
                      <h2 className="text-xl font-bold text-[#FAFBF9] sm:text-2xl">المنتجات</h2>
                      <span className="rounded-full border border-[#D1AC81]/20 bg-[#241E18] px-2.5 py-1 text-xs font-semibold text-[#D1AC81]">
                        {imagesList.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {imagesList.map((item, index) => renderCard(item, index, "image"))}
                    </div>
                  </div>
                ) : null}

                {videosList.length > 0 ? (
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 border-r-4 border-[#C3986E] pr-3" dir="rtl">
                      <h2 className="text-xl font-bold text-[#FAFBF9] sm:text-2xl">الفيديوهات</h2>
                      <span className="rounded-full border border-[#D1AC81]/20 bg-[#241E18] px-2.5 py-1 text-xs font-semibold text-[#D1AC81]">
                        {videosList.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {videosList.map((item, index) => renderCard(item, index, "video"))}
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
