"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { useEmailVerify } from "@/hooks/useEmailVerify";

const EmailVerificationContext = createContext<ReturnType<typeof useEmailVerify> | null>(null);

export const EmailVerificationProvider = ({ children }: { children: ReactNode }) => {
  const emailVerify = useEmailVerify();

  const value = useMemo(() => ({ ...emailVerify }), [emailVerify]);

  return (
    <EmailVerificationContext.Provider value={value}>{children}</EmailVerificationContext.Provider>
  );
};

export const useEmailVerificationProvider = () => {
  const context = useContext(EmailVerificationContext);
  if (!context) {
    throw new Error(
      "useEmailVerificationProvider must be used within an EmailVerificationProvider"
    );
  }
  return context;
};
