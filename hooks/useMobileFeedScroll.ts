"use client";

import { useState, useEffect, useRef } from "react";
import { TimelineMoment } from "@/types/moment";

const PAGE_SIZE = 10;

export const useMobileFeedScroll = (moments: TimelineMoment[]) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, moments.length));
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [moments.length]);

  return {
    visibleMoments: moments.slice(0, visibleCount),
    hasMore: visibleCount < moments.length,
    sentinelRef,
  };
};
