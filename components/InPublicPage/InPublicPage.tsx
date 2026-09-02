"use client";

import { useTimelineProvider } from "@/providers/TimelineProvider";
import useIsMobile from "@/hooks/useIsMobile";
import InPublicHero from "@/components/InPublicPage/InPublicHero";
import MomentsMasonryGrid from "@/components/HomePage/MomentsMasonryGrid";
import MobileMomentsFeed from "@/components/HomePage/MobileMomentsFeed";
import CollectDrawer from "@/components/HomePage/CollectDrawer";
import CommentDrawer from "@/components/HomePage/CommentDrawer";

const InPublicPage = () => {
  const { error } = useTimelineProvider();
  const isMobile = useIsMobile();

  if (error) return <main>Error loading timeline.</main>;

  return (
    <>
      <main className="relative flex w-full grow flex-col px-4 md:px-10 xl:px-14 2xl:px-20 3xl:px-28">
        <InPublicHero />
        {isMobile ? <MobileMomentsFeed /> : <MomentsMasonryGrid />}
      </main>
      <CollectDrawer />
      <CommentDrawer />
    </>
  );
};

export default InPublicPage;
