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
    <main className="flex w-full flex-col md:flex-row grow gap-4 px-2 pt-6 md:mx-auto md:h-[calc(100vh-66px)] md:max-w-[1080px] md:gap-11 md:overflow-hidden md:px-10">
      <div className="flex flex-row w-full shrink-0 gap-1.5 md:w-[210px] overflow-x-auto no-scrollbar md:flex-col md:gap-0.5 md:overflow-visible">
        <NavButton label="account" href="/manage/account" icon={User} />
        <NavButton label="payment" href="/manage/payment" icon={CreditCard} />
        <NavButton label="moments" href="/manage/moments" icon={CircleDot} />
        {hasMutualMoments && (
          <NavButton label="mutual moments" href="/manage/mutual-moments" icon={Users} />
        )}
      </div>
      <div className="w-full no-scrollbar md:h-full md:max-w-[680px] md:grow md:overflow-y-auto md:pb-10">
        {children}
      </div>
    </main>
  );
};

export default ManagePage;
