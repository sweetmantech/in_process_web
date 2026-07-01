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
      <div
        className={cn(
          "flex grow flex-col",
          isOpenNavbar && "h-screen overflow-hidden",
          isTextureLayout && "bg-[url('/bg-gray.png')] bg-cover bg-top bg-no-repeat md:bg-fixed"
        )}
      >
        <Header />
        <div className="relative flex grow flex-col pb-[74px] md:pb-0">{children}</div>
        <Footer />
      </div>
    </MobileDrawersProvider>
  );
};

export default Layout;
