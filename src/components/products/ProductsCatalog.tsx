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

type FirestoreProduct = {
  id: string;
  title: string;
  price: string | number;
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

function formatPrice(price: string | number) {
  if (price === "" || price == null) return null;
  if (typeof price === "number") {
    return `${price.toLocaleString("ar-LY")} د.ل`;
  }
  const asNum = Number(price);
  if (Number.isFinite(asNum) && String(price).trim() !== "") {
    return `${asNum.toLocaleString("ar-LY")} د.ل`;
  }
  return String(price);
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

  if (mediaType === "video") {
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
            price: data.price ?? "",
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

  const tabs = useMemo(
    () => [{ id: ALL, name: "الكل" }, ...categories.map((c) => ({ id: c.name, name: c.name }))],
    [categories]
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
              <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((item, index) => {
                  const priceLabel = formatPrice(item.price);
                  return (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: Math.min(index * 0.04, 0.35),
                        duration: 0.35,
                      }}
                      className="overflow-hidden rounded-2xl border border-[rgba(209,172,129,0.2)] bg-[#241E18] transition-all duration-300 hover:border-[#C3986E] hover:shadow-xl"
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
                        {priceLabel ? (
                          <p className="text-base font-semibold text-[#C3986E]">
                            {priceLabel}
                          </p>
                        ) : null}
                        {item.description ? (
                          <p className="text-sm leading-relaxed text-[#E2E8F0]/85">
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
