"use client";

import Header from "../Header";
import Footer from "../Footer";
import { ReactNode } from "react";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import useIsMobile from "@/hooks/useIsMobile";

const Layout = ({ children }: { children: ReactNode }) => {
  const { isOpenNavbar } = useLayoutProvider();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isTextureLayout = !pathname.includes("/create");
  const isMobileHome = isMobile && pathname === "/";

  return (
    <div
      className={cn(
        "flex grow flex-col",
        isOpenNavbar && "h-screen overflow-hidden",
        isTextureLayout && "bg-[url('/bg-gray.png')] bg-cover bg-fixed bg-top bg-no-repeat"
      )}
    >
      {!isMobileHome && <Header />}
      <div
        className={cn("relative flex grow flex-col", isMobileHome && "h-screen overflow-hidden")}
      >
        {children}
      </div>
      {!isMobileHome && <Footer />}
    </div>
  );
};

export default Layout;
