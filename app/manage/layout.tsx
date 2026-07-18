"use client";

import { ReactNode } from "react";
import { User, CreditCard, CircleDot, Users } from "lucide-react";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useHasMutualMoments } from "@/hooks/useHasMutualMoments";
import NavButton from "@/components/ManagePage/NavButton";

const ManagePage = ({ children }: { children: ReactNode }) => {
  const { primaryWallet } = useWalletsProvider();
  const { hasMutualMoments } = useHasMutualMoments(primaryWallet);

  return (
    // md:h: fills the viewport below the sticky 63px header so only the content column scrolls
    <main className="flex w-full flex-col md:flex-row grow gap-4 px-2 pt-0 md:mx-auto md:h-[calc(100vh-66px)] md:max-w-[95%] md:gap-11 md:overflow-hidden md:px-10 pb-4">
      <div className="fixed inset-x-0 top-[calc(72px+env(safe-area-inset-top,0px))] z-20 flex w-full shrink-0 flex-row gap-1.5 px-2 py-1 overflow-x-auto no-scrollbar md:static md:inset-x-auto md:top-auto md:z-auto md:w-[210px] md:flex-col md:gap-0.5 md:overflow-visible md:p-0">
        <NavButton label="account" href="/manage/account" icon={User} />
        <NavButton label="payment" href="/manage/payment" icon={CreditCard} />
        <NavButton label="moments" href="/manage/moments" icon={CircleDot} />
        {hasMutualMoments && (
          <NavButton label="mutual moments" href="/manage/mutual-moments" icon={Users} />
        )}
      </div>
      <div className="no-scrollbar fixed inset-x-0 top-[calc(113px+env(safe-area-inset-top,0px))] bottom-[calc(74px+env(safe-area-inset-bottom,0px))] overflow-y-auto px-2 pb-2 pt-3 md:static md:inset-auto md:h-full md:grow md:modern-scrollbar md:overflow-y-auto md:pl-0 md:pr-3 md:pt-0">
        {children}
      </div>
    </main>
  );
};

export default ManagePage;
