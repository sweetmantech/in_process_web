"use client";

import { useState, useEffect, useRef } from "react";
import { TimelineMoment } from "@/types/moment";

const DEFAULT_PAGE_SIZE = 10;

export const useFeedScroll = (moments: TimelineMoment[], pageSize = DEFAULT_PAGE_SIZE) => {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + pageSize, moments.length));
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [moments.length, pageSize]);

  return {
    visibleMoments: moments.slice(0, visibleCount),
    hasMore: visibleCount < moments.length,
    sentinelRef,
  };
};
