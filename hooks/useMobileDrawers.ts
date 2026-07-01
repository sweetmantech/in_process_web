"use client";

import { TimelineMoment } from "@/types/moment";
import { useCallback, useEffect, useState } from "react";

const DRAWER_CLOSE_MS = 300;

export type MobileDrawerId = "search" | "feedback" | "user" | "collect";

export type MobileFooterDrawerId = Exclude<MobileDrawerId, "collect">;

const useMobileDrawers = () => {
  const [activeDrawer, setActiveDrawer] = useState<MobileDrawerId | null>(null);
  const [collectMoment, setCollectMoment] = useState<TimelineMoment | null>(null);

  useEffect(() => {
    if (!activeDrawer) return;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const previous = {
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
      overflow: style.overflow,
    };

    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden";

    return () => {
      style.position = previous.position;
      style.top = previous.top;
      style.left = previous.left;
      style.right = previous.right;
      style.width = previous.width;
      style.overflow = previous.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [activeDrawer]);

  const isDrawerOpen = useCallback((id: MobileDrawerId) => activeDrawer === id, [activeDrawer]);

  const toggleDrawer = useCallback((id: MobileFooterDrawerId) => {
    setCollectMoment(null);
    setActiveDrawer((current) => (current === id ? null : id));
  }, []);

  const openCollect = useCallback((moment: TimelineMoment) => {
    setCollectMoment(moment);
    setActiveDrawer("collect");
  }, []);

  const closeDrawer = useCallback(() => {
    setActiveDrawer(null);
    window.setTimeout(() => setCollectMoment(null), DRAWER_CLOSE_MS);
  }, []);

  return {
    activeDrawer,
    collectMoment,
    isDrawerOpen,
    toggleDrawer,
    openCollect,
    closeDrawer,
  };
};

export default useMobileDrawers;
