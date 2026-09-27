"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";

type FirestoreProject = {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: string;
};

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
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      loading="lazy"
    />
  );
}

export default function ProjectsGallery() {
  const [projects, setProjects] = useState<FirestoreProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        let docs;
        try {
          const snapshot = await getDocs(
            query(collection(db, "projects"), orderBy("createdAt", "desc"))
          );
          docs = snapshot.docs;
        } catch {
          const snapshot = await getDocs(collection(db, "projects"));
          docs = [...snapshot.docs].sort((a, b) => {
            const aTime = a.data().createdAt?.toMillis?.() ?? 0;
            const bTime = b.data().createdAt?.toMillis?.() ?? 0;
            return bTime - aTime;
          });
        }

        if (cancelled) return;

        const items: FirestoreProject[] = docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            title: String(data.title ?? ""),
            description: String(data.description ?? ""),
            mediaUrl: String(data.mediaUrl ?? ""),
            mediaType: String(data.mediaType ?? "image"),
          };
        });
        setProjects(items);
      } catch (err) {
        console.error("Failed to load projects:", err);
        if (!cancelled) {
          setError("تعذر تحميل المشاريع. حاول مرة أخرى لاحقاً.");
          setProjects([]);
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

  return (
    <section className="relative bg-brand-bg px-4 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-14">
          <span className="brand-badge">✦ المشاريع</span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            <span className="text-gradient-gold">معرض المشاريع</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-brand-text-light sm:text-base">
            مختارات من أعمال التركيب والتنفيذ المعروضة مباشرة من المعرض.
          </p>
        </div>

        {loading ? (
          <p className="py-20 text-center text-base text-[#D1AC81] sm:text-lg">
            جاري تحميل المشاريع...
          </p>
        ) : error ? (
          <p className="py-20 text-center text-base text-red-300/90 sm:text-lg">
            {error}
          </p>
        ) : projects.length === 0 ? (
          <p className="py-20 text-center text-base text-brand-text-light sm:text-lg">
            لا توجد مشاريع حالياً
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: Math.min(i * 0.05, 0.35), duration: 0.4 }}
                className="group overflow-hidden rounded-2xl border border-[rgba(209,172,129,0.2)] bg-[#241E18] p-2 transition-all duration-300 hover:border-[#C3986E] hover:shadow-xl"
              >
                <div className="aspect-[16/11] overflow-hidden rounded-xl bg-[#1A1612]">
                  <MediaPreview
                    mediaUrl={item.mediaUrl}
                    mediaType={item.mediaType}
                    title={item.title}
                  />
                </div>
                <div className="space-y-2 p-3 sm:p-4" dir="rtl">
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
