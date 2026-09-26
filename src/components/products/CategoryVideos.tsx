"use client";

import { useEffect, useRef } from "react";
import PublicMediaVideo from "@/components/PublicMediaVideo";

type CategoryVideosProps = {
  videos: string[];
  featuredVideo?: { src: string; title: string };
  resetKey: string;
};

export default function CategoryVideos({
  videos,
  featuredVideo,
  resetKey,
}: CategoryVideosProps) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    refs.current.forEach((v) => {
      if (!v) return;
      v.pause();
      v.currentTime = 0;
    });
  }, [resetKey]);

  const pauseOthers = (active: HTMLVideoElement) => {
    refs.current.forEach((v) => {
      if (v && v !== active && !v.paused) v.pause();
    });
  };

  const entries: { src: string; title?: string }[] = [
    ...(featuredVideo
      ? [{ src: featuredVideo.src, title: featuredVideo.title }]
      : []),
    ...videos.map((src) => ({ src })),
  ];

  if (!entries.length) return null;

  return (
    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
      {entries.map((item, i) => (
        <div
          key={`${item.src}-${i}`}
          className={`rounded-2xl border border-neutral-800 bg-neutral-900/60 p-2 ${
            item.title ? "md:col-span-2" : ""
          }`}
        >
          {item.title ? (
            <h3 className="mb-3 px-2 pt-1 text-center text-base font-bold text-[#D1AC81] sm:text-lg">
              {item.title}
            </h3>
          ) : null}
          <div className="overflow-hidden rounded-xl bg-black">
            <PublicMediaVideo
              src={item.src}
              className="aspect-video w-full object-cover"
              onPlay={(el) => {
                refs.current[i] = el;
                pauseOthers(el);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
