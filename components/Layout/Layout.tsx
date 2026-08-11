"use client";

import Header from "../Header";
import Footer from "../Footer";
import { ReactNode } from "react";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import { MobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import useIsMobile from "@/hooks/useIsMobile";

const Layout = ({ children }: { children: ReactNode }) => {
  const { isOpenNavbar } = useLayoutProvider();
  const pathname = usePathname();
  const isCreatePage = pathname.includes("/create");
  const isMobile = useIsMobile();

  return (
    <MobileDrawersProvider>
      <div
        className={cn(
          "relative flex grow flex-col",
          isOpenNavbar && "h-screen overflow-hidden",
          isCreatePage && "md:h-screen md:overflow-hidden"
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 bg-[url('/bg-gray.png')] bg-cover bg-top bg-no-repeat"
        />
        <Header />
        <div className="relative z-10 flex grow flex-col pt-[calc(54px+env(safe-area-inset-top,0px))] pb-[calc(74px+env(safe-area-inset-bottom,0px))] md:min-h-0 md:pb-0 md:pt-0">
          {children}
        </div>
        {isMobile && <Footer />}
      </div>
    </MobileDrawersProvider>
  );
};

export default Layout;
