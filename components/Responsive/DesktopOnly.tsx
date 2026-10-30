"use client";

import { ReactNode } from "react";
import useViewport from "@/hooks/useViewport";

const DesktopOnly = ({ children }: { children: ReactNode }) => {
  const viewport = useViewport();

  if (viewport === "mobile") return null;

  return <div className={viewport ? "contents" : "hidden min-[769px]:contents"}>{children}</div>;
};

export default DesktopOnly;
