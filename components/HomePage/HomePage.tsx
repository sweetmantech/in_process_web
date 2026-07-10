"use client";

import { useTimelineProvider } from "@/providers/TimelineProvider";
import useIsMobile from "@/hooks/useIsMobile";
import Hero from "@/components/HomePage/Hero";
import MomentsMasonryGrid from "@/components/HomePage/MomentsMasonryGrid";
import MobileMomentsFeed from "@/components/HomePage/MobileMomentsFeed";
import CollectDrawer from "@/components/HomePage/CollectDrawer";
import CommentDrawer from "@/components/HomePage/CommentDrawer";

const HomePage = () => {
  const { error } = useTimelineProvider();
  const isMobile = useIsMobile();

  if (error) return <main>Error loading timeline.</main>;

  return (
    <>
      <main className="relative flex w-full grow flex-col px-4 md:px-10 xl:px-14 2xl:px-20 3xl:px-28">
        <Hero />
        {isMobile ? <MobileMomentsFeed /> : <MomentsMasonryGrid />}
      </main>
      <CollectDrawer />
      <CommentDrawer />
    </>
  );
};

export default HomePage;
