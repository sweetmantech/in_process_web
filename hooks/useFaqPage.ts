"use client";

import { useEffect, useMemo, useState } from "react";
import { allFaqItems, faqItemKey, faqSearchFlatText, type FaqItem } from "@/lib/faq/faqContent";

const useFaqPage = () => {
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    if (!allFaqItems.some((item) => item.id === hash)) return;
    setOpenIds({ [hash]: true });
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ block: "start" });
    });
  }, []);

  const filtered: FaqItem[] | null = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return allFaqItems.filter((item) => faqSearchFlatText(item).includes(q));
  }, [query]);

  const visibleCount = filtered?.length ?? allFaqItems.length;
  const countLabel = query.trim() ? `${visibleCount} found` : `${visibleCount}`;

  const visibleItems = filtered ?? allFaqItems;

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setOpenIds({});
  };

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const hasOpenItems = Object.values(openIds).some(Boolean);

  const collapseAll = () => {
    setOpenIds({});
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    visibleItems.forEach((item, index) => {
      const id = faqItemKey(item, filtered ? `search-${index}` : (item.id ?? `item-${index}`));
      next[id] = true;
    });
    setOpenIds(next);
  };

  return {
    query,
    openIds,
    filtered,
    countLabel,
    handleQueryChange,
    toggleItem,
    hasOpenItems,
    collapseAll,
    expandAll,
  };
};

export default useFaqPage;
