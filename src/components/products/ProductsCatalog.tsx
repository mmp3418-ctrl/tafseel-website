"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";

type FirestoreProduct = {
  id: string;
  title: string;
  category: string;
  description: string;
  mediaUrl: string;
  mediaType: string;
};

type FirestoreCategory = {
  id: string;
  name: string;
};

const ALL = "__all__";

function isVideoFile(mediaUrl: string, mediaType: string): boolean {
  if (mediaType === "video") return true;
  if (!mediaUrl) return false;
  return /\.(mp4|webm|ogg|mov|m4v)($|\?)/i.test(mediaUrl);
}

function MediaPreview({
  mediaUrl,
  mediaType,
  title,
}: {
  mediaUrl: string;
  mediaType: string;
  title: string;
}) {
  if (!mediaUrl) {
    return (
      <div className="flex h-full items-center justify-center bg-[#1A1612] text-xs text-neutral-500">
        لا توجد وسائط
      </div>
    );
  }

  if (isVideoFile(mediaUrl, mediaType)) {
    return (
      <video
        src={mediaUrl}
        controls
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={mediaUrl}
      alt={title}
      className="h-full w-full object-cover"
      loading="lazy"
    />
  );
}

export default function ProductsCatalog() {
  const [categories, setCategories] = useState<FirestoreCategory[]>([]);
  const [products, setProducts] = useState<FirestoreProduct[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const imagesScrollRef = useRef<HTMLDivElement>(null);
  const videosScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      // التمرير لمسافة كارت واحد (حوالي 360px مع الفراغ)
      const scrollAmount = direction === "left" ? -360 : 360;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const catSnap = await getDocs(collection(db, "categories"));

        let prodDocs;
        try {
          const prodSnap = await getDocs(
            query(collection(db, "products"), orderBy("createdAt", "desc"))
          );
          prodDocs = prodSnap.docs;
        } catch {
          const prodSnap = await getDocs(collection(db, "products"));
          prodDocs = [...prodSnap.docs].sort((a, b) => {
            const aTime = a.data().createdAt?.toMillis?.() ?? 0;
            const bTime = b.data().createdAt?.toMillis?.() ?? 0;
            return bTime - aTime;
          });
        }

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
          const data = docSnap.data();
          return {
            id: docSnap.id,
            title: String(data.title ?? ""),
            category: String(data.category ?? ""),
            description: String(data.description ?? ""),
            mediaUrl: String(data.mediaUrl ?? ""),
            mediaType: String(data.mediaType ?? "image"),
          };
        });

        setCategories(cats);
        setProducts(items);
      } catch (err) {
        console.error("Failed to load products/categories:", err);
        if (!cancelled) {
          setError("تعذر تحميل المنتجات. حاول مرة أخرى لاحقاً.");
          setCategories([]);
          setProducts([]);
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
      if (isVideoFile(item.mediaUrl, item.mediaType)) {
        videos.push(item);
      } else {
        images.push(item);
      }
    });

    return { imagesList: images, videosList: videos };
  }, [filtered]);

  const tabs = useMemo(
    () => [{ id: ALL, name: "الكل" }, ...categories.map((c) => ({ id: c.name, name: c.name }))],
    [categories]
  );

  const renderCard = (item: FirestoreProduct, index: number) => (
    <motion.article
      key={item.id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.04, 0.35),
        duration: 0.35,
      }}
      className="h-full overflow-hidden rounded-2xl border border-[rgba(209,172,129,0.2)] bg-[#241E18] transition-all duration-300 hover:border-[#C3986E] hover:shadow-xl"
    >
      <div className="aspect-[16/11] overflow-hidden bg-[#1A1612]">
        <MediaPreview
          mediaUrl={item.mediaUrl}
          mediaType={item.mediaType}
          title={item.title}
        />
      </div>
      <div className="space-y-2 p-4 sm:p-5" dir="rtl">
        {item.category ? (
          <span className="inline-block rounded-full border border-[#D1AC81]/30 px-2.5 py-0.5 text-xs font-semibold text-[#D1AC81]">
            {item.category}
          </span>
        ) : null}
        <h2 className="text-lg font-bold text-[#FAFBF9] sm:text-xl">
          {item.title}
        </h2>
        {item.description ? (
          <p className="text-sm leading-relaxed text-[#E2E8F0]/85">
            {item.description}
          </p>
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
          <p className="py-20 text-center text-base text-[#D1AC81] sm:text-lg">
            جاري تحميل المنتجات...
          </p>
        ) : error ? (
          <p className="py-20 text-center text-base text-red-300/90 sm:text-lg">
            {error}
          </p>
        ) : (
          <>
            <div
              className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3"
              role="tablist"
              aria-label="فئات المنتجات"
              dir="rtl"
            >
              {tabs.map((tab) => {
                const selected = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`rounded-full px-4 py-2.5 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                      selected
                        ? "scale-[1.02] bg-gradient-to-r from-[#C3986E] to-[#D1AC81] text-[#12100E] shadow-lg"
                        : "border border-[#D1AC81]/25 bg-[#241E18] text-[#E2E8F0] hover:border-[#C3986E] hover:text-[#D1AC81]"
                    }`}
                  >
                    {tab.name}
                  </button>
                );
              })}
            </div>

            {filtered.length === 0 ? (
              <p className="py-16 text-center text-base text-brand-text-light sm:text-lg">
                لا توجد منتجات حالياً
              </p>
            ) : (
              <div className="space-y-16">
                {/* 📸 معرض الصور */}
                {imagesList.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-r-4 border-[#C3986E] pr-3" dir="rtl">
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-[#FAFBF9] sm:text-3xl">
                          معرض الصور
                        </h2>
                        <span className="text-xs font-semibold text-[#D1AC81] bg-[#241E18] px-2.5 py-1 rounded-full border border-[#D1AC81]/20">
                          {imagesList.length}
                        </span>
                      </div>

                      {/* أزرار الأسهم للصور */}
                      <div className="flex items-center gap-2" dir="ltr">
                        <button
                          type="button"
                          onClick={() => scroll(imagesScrollRef, "left")}
                          aria-label="التالي"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D1AC81]/30 bg-[#241E18] text-[#D1AC81] transition-all duration-300 hover:border-[#C3986E] hover:bg-[#C3986E] hover:text-[#12100E]"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={() => scroll(imagesScrollRef, "right")}
                          aria-label="السابق"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D1AC81]/30 bg-[#241E18] text-[#D1AC81] transition-all duration-300 hover:border-[#C3986E] hover:bg-[#C3986E] hover:text-[#12100E]"
                        >
                          ›
                        </button>
                      </div>
                    </div>

                    {/* حاوية السلايدر للصور */}
                    <div
                      ref={imagesScrollRef}
                      className="flex gap-5 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
                      dir="rtl"
                    >
                      {imagesList.map((item, index) => (
                        <div
                          key={item.id}
                          className="w-[85vw] max-w-[340px] flex-shrink-0 sm:w-[320px] md:w-[340px]"
                        >
                          {renderCard(item, index)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 🎥 معرض الفيديوهات */}
                {videosList.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-r-4 border-[#C3986E] pr-3" dir="rtl">
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-[#FAFBF9] sm:text-3xl">
                          معرض الفيديوهات
                        </h2>
                        <span className="text-xs font-semibold text-[#D1AC81] bg-[#241E18] px-2.5 py-1 rounded-full border border-[#D1AC81]/20">
                          {videosList.length}
                        </span>
                      </div>

                      {/* أزرار الأسهم للفيديوهات */}
                      <div className="flex items-center gap-2" dir="ltr">
                        <button
                          type="button"
                          onClick={() => scroll(videosScrollRef, "left")}
                          aria-label="التالي"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D1AC81]/30 bg-[#241E18] text-[#D1AC81] transition-all duration-300 hover:border-[#C3986E] hover:bg-[#C3986E] hover:text-[#12100E]"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={() => scroll(videosScrollRef, "right")}
                          aria-label="السابق"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D1AC81]/30 bg-[#241E18] text-[#D1AC81] transition-all duration-300 hover:border-[#C3986E] hover:bg-[#C3986E] hover:text-[#12100E]"
                        >
                          ›
                        </button>
                      </div>
                    </div>

                    {/* حاوية السلايدر للفيديوهات */}
                    <div
                      ref={videosScrollRef}
                      className="flex gap-5 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
                      dir="rtl"
                    >
                      {videosList.map((item, index) => (
                        <div
                          key={item.id}
                          className="w-[85vw] max-w-[340px] flex-shrink-0 sm:w-[320px] md:w-[340px]"
                        >
                          {renderCard(item, index)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}