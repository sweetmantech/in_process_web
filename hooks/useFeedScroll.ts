"use client";

import { useState, useEffect, useRef } from "react";

const DEFAULT_PAGE_SIZE = 10;

export const useFeedScroll = <T>(items: T[], pageSize = DEFAULT_PAGE_SIZE) => {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + pageSize, items.length));
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length, pageSize]);

  return {
    visibleMoments: items.slice(0, visibleCount),
    hasMore: visibleCount < items.length,
    sentinelRef,
  };
};
