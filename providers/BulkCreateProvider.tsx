"use client";

import React, { createContext, useContext, useMemo } from "react";
import useBulkCreate from "@/hooks/useBulkCreate";

const BulkCreateContext = createContext<ReturnType<typeof useBulkCreate> | undefined>(undefined);

const BulkCreateProvider = ({ children }: { children: React.ReactNode }) => {
  const bulk = useBulkCreate();
  const value = useMemo(() => ({ ...bulk }), [bulk]);
  return <BulkCreateContext.Provider value={value}>{children}</BulkCreateContext.Provider>;
};

const useBulkCreateProvider = () => {
  const context = useContext(BulkCreateContext);
  if (!context) {
    throw new Error("useBulkCreateProvider must be used within a BulkCreateProvider");
  }
  return context;
};

export { BulkCreateProvider, useBulkCreateProvider };
