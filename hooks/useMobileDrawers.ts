"use client";

import { TimelineMoment } from "@/types/moment";
import { useCallback, useState } from "react";

const DRAWER_CLOSE_MS = 300;

export type MobileDrawerId = "search" | "feedback" | "user" | "collect" | "comment";

export type MobileFooterDrawerId = Exclude<MobileDrawerId, "collect" | "comment">;

const useMobileDrawers = () => {
  const [activeDrawer, setActiveDrawer] = useState<MobileDrawerId | null>(null);
  const [collectMoment, setCollectMoment] = useState<TimelineMoment | null>(null);
  const [commentMoment, setCommentMoment] = useState<TimelineMoment | null>(null);

  const isDrawerOpen = useCallback((id: MobileDrawerId) => activeDrawer === id, [activeDrawer]);

  const toggleDrawer = useCallback((id: MobileFooterDrawerId) => {
    setCollectMoment(null);
    setCommentMoment(null);
    setActiveDrawer((current) => (current === id ? null : id));
  }, []);

  const openCollect = useCallback((moment: TimelineMoment) => {
    setCollectMoment(moment);
    setActiveDrawer("collect");
  }, []);

  const openComment = useCallback((moment: TimelineMoment) => {
    setCommentMoment(moment);
    setActiveDrawer("comment");
  }, []);

  const closeDrawer = useCallback(() => {
    setActiveDrawer(null);
    window.setTimeout(() => {
      setCollectMoment(null);
      setCommentMoment(null);
    }, DRAWER_CLOSE_MS);
  }, []);

  return {
    activeDrawer,
    collectMoment,
    commentMoment,
    isDrawerOpen,
    toggleDrawer,
    openCollect,
    openComment,
    closeDrawer,
  };
};

export default useMobileDrawers;
