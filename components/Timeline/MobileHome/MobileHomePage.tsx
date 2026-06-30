"use client";

import { useMobileHomePage } from "@/hooks/useMobileHomePage";
import { useMobileFeedScroll } from "@/hooks/useMobileFeedScroll";
import MobileHero from "./MobileHero";
import MobileFeedCard from "./MobileFeedCard";

const MobileHomePage = () => {
  const { moments, totalCount, todayCount, onCreateClick } = useMobileHomePage();
  const { visibleMoments, hasMore, sentinelRef } = useMobileFeedScroll(moments);

  return (
    <div className="flex flex-col">
      <MobileHero totalCount={totalCount} todayCount={todayCount} onCreateClick={onCreateClick} />
      <div className="flex flex-col px-4 pb-2">
        {visibleMoments.map((moment) => (
          <MobileFeedCard key={moment.id} moment={moment} />
        ))}
        {hasMore && <div ref={sentinelRef} className="h-px" />}
      </div>
    </div>
  );
};

export default MobileHomePage;
