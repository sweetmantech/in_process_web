"use client";

import { useState, useEffect, useRef } from "react";

const DEFAULT_PAGE_SIZE = 10;

export const useFeedScroll = <T>(items: T[], pageSize = DEFAULT_PAGE_SIZE) => {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const itemsLengthRef = useRef(items.length);
  itemsLengthRef.current = items.length;

  useEffect(() => {
    if (items.length === 0) return;
    setVisibleCount((prev) => Math.min(Math.max(prev, pageSize), items.length));
  }, [items.length, pageSize]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisibleCount((prev) => Math.min(prev + pageSize, itemsLengthRef.current));
      },
      { threshold: 0, rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pageSize, visibleCount, items.length]);

  return {
    visibleMoments: items.slice(0, visibleCount),
    hasMore: visibleCount < items.length,
    sentinelRef,
  };
};
