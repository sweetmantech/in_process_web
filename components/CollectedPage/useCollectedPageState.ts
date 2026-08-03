"use client";

import { useMemo, useState } from "react";
import { mockCollectedItems } from "./mockCollectedItems";
import type { CollectedItem, CollectedSort, ContentTypeFilter } from "./types";

export function useCollectedPageState() {
  const [contentType, setContentType] = useState<ContentTypeFilter>("All");
  const [dense, setDense] = useState(false);
  const [sort] = useState<CollectedSort>("recent");
  const [modalId, setModalId] = useState<number | null>(null);

  const all = mockCollectedItems;

  const items = useMemo(() => {
    let list = all.filter(
      (item) => contentType === "All" || item.contentType === contentType
    );
    list = list.slice().sort((a, b) => {
      if (sort === "recent") return b.acquiredAt - a.acquiredAt;
      if (sort === "oldest") return a.acquiredAt - b.acquiredAt;
      if (sort === "phigh") return b.usd - a.usd;
      return a.usd - b.usd;
    });
    return list;
  }, [all, contentType, sort]);

  const typeTabs = useMemo(() => {
    const types: ContentTypeFilter[] = ["All", "Image", "Video", "PDF", "Other"];
    return types.map((label) => ({
      label,
      count:
        label === "All"
          ? all.length
          : all.filter((item) => item.contentType === label).length,
    }));
  }, [all]);

  const modalItem: CollectedItem | null =
    modalId === null ? null : (all.find((item) => item.id === modalId) ?? null);

  return {
    items,
    typeTabs,
    contentType,
    setContentType,
    dense,
    setDense,
    resultCount: `${items.length} of ${all.length} pieces`,
    modalItem,
    openModal: (id: number) => setModalId(id),
    closeModal: () => setModalId(null),
  };
}
