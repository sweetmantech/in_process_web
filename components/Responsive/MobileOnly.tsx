"use client";

import { ReactNode } from "react";
import useViewport from "@/hooks/useViewport";

const MobileOnly = ({ children }: { children: ReactNode }) => {
  const viewport = useViewport();

  if (viewport === "desktop") return null;

  return <div className={viewport ? "contents" : "contents min-[769px]:hidden"}>{children}</div>;
};

export default MobileOnly;
