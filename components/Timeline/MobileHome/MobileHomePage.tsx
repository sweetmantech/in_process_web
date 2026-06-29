"use client";

import { useMobileHomePage } from "@/hooks/useMobileHomePage";
import { useMobileFeedScroll } from "@/hooks/useMobileFeedScroll";
import { useMobileScrolled } from "@/hooks/useMobileScrolled";
import MobileHomeHeader from "./MobileHomeHeader";
import MobileHero from "./MobileHero";
import MobileFeedCard from "./MobileFeedCard";
import MobileTabBar from "./MobileTabBar";

const MobileHomePage = () => {
  const { moments, totalCount, todayCount, onCreateClick } = useMobileHomePage();
  const { visibleMoments, hasMore, sentinelRef } = useMobileFeedScroll(moments);
  const { isScrolled, scrollRef } = useMobileScrolled();

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden">
        <MobileHomeHeader isScrolled={isScrolled} />
        <MobileHero totalCount={totalCount} todayCount={todayCount} onCreateClick={onCreateClick} />
        <div className="flex flex-col px-4 pb-2">
          {visibleMoments.map((moment) => (
            <MobileFeedCard key={moment.id} moment={moment} />
          ))}
          {hasMore && <div ref={sentinelRef} className="h-px" />}
        </div>
      </div>
      <MobileTabBar />
    </div>
  );
};

export default MobileHomePage;
