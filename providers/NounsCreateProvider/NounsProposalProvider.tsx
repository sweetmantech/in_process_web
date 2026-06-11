"use client";

import React, { createContext, useContext, useMemo } from "react";
import useNounsCreate from "@/hooks/useNounsCreate";

const NounsProposalContext = createContext<ReturnType<typeof useNounsCreate> | undefined>(
  undefined
);

const NounsProposalProvider = ({ children }: { children: React.ReactNode }) => {
  const nounsCreate = useNounsCreate();
  const value = useMemo(() => ({ ...nounsCreate }), [nounsCreate]);
  return <NounsProposalContext.Provider value={value}>{children}</NounsProposalContext.Provider>;
};

const useNounsProposalProvider = () => {
  const context = useContext(NounsProposalContext);
  if (!context)
    throw new Error("useNounsProposalProvider must be used within NounsProposalProvider");
  return context;
};

export { NounsProposalProvider, useNounsProposalProvider };
