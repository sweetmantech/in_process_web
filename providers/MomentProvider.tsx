"use client";

import { Moment, MomentApiResponse, MomentFetchOptions } from "@/types/moment";
import { createContext, useContext, ReactNode } from "react";
import useMomentData from "@/hooks/useMomentData";

const MomentContext = createContext<
  | (ReturnType<typeof useMomentData> & {
      moment: Moment;
    })
  | undefined
>(undefined);

interface MomentProviderProps {
  children: ReactNode;
  moment: Moment;
  initialData?: MomentApiResponse;
  fetchOptions?: MomentFetchOptions;
}

export function MomentProvider({
  children,
  moment,
  initialData,
  fetchOptions,
}: MomentProviderProps) {
  const momentdata = useMomentData(moment, { initialData, ...fetchOptions });

  return (
    <MomentContext.Provider
      value={{
        moment,
        ...momentdata,
      }}
    >
      {children}
    </MomentContext.Provider>
  );
}

export function useMomentProvider() {
  const context = useContext(MomentContext);
  if (context === undefined) {
    throw new Error("useMomentProvider must be used within a MomentProvider");
  }
  return context;
}
