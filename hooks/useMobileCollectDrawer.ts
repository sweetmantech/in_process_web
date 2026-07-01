"use client";

import { TimelineMoment } from "@/types/moment";
import { useCallback, useState } from "react";

const DRAWER_CLOSE_MS = 300;

const useMobileCollectDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState<TimelineMoment | null>(null);

  const openCollect = useCallback((moment: TimelineMoment) => {
    setSelectedMoment(moment);
    setIsOpen(true);
  }, []);

  const closeCollect = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => setSelectedMoment(null), DRAWER_CLOSE_MS);
  }, []);

  return {
    isOpen,
    selectedMoment,
    openCollect,
    closeCollect,
  };
};

export default useMobileCollectDrawer;
