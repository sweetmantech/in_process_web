"use client";

import { ReactNode } from "react";
import NounsCreateProviderWrapper from "@/providers/NounsCreateProvider/NounsCreateProviderWrapper";

const NounsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <NounsCreateProviderWrapper>
      <main className="w-screen grow">
        <div className="relative mt-12 grid w-full grid-cols-1 gap-6 px-6 md:mt-24 md:grid-cols-3 md:px-10">
          {children}
        </div>
      </main>
    </NounsCreateProviderWrapper>
  );
};

export default NounsLayout;
