"use client";

import Header from "../Header";
import Footer from "../Footer";
import { ReactNode } from "react";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import { MobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Layout = ({ children }: { children: ReactNode }) => {
  const { isOpenNavbar } = useLayoutProvider();
  const pathname = usePathname();
  const isTextureLayout = !pathname.includes("/create");

  return (
    <MobileDrawersProvider>
      {isTextureLayout && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-[url('/bg-gray.png')] bg-cover bg-top bg-no-repeat"
        />
      )}
      <div className={cn("flex grow flex-col", isOpenNavbar && "h-screen overflow-hidden")}>
        <Header />
        <div className="relative flex grow flex-col pt-[calc(54px+env(safe-area-inset-top,0px))] pb-[calc(74px+env(safe-area-inset-bottom,0px))] md:pb-0 md:pt-0">
          {children}
        </div>
        <Footer />
      </div>
    </MobileDrawersProvider>
  );
};

export default Layout;
