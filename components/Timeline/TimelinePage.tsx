"use client";

import { useTimelineProvider } from "@/providers/TimelineProvider";
import TimelineHero from "@/components/Timeline/TimelineHero";
import useIsMobile from "@/hooks/useIsMobile";
import TimelineGrid from "./TimelineGrid";
import TimelineSpiral from "./TimelineSpiral";
import MobileHomePage from "./MobileHome/MobileHomePage";

const TimelinePage = () => {
  const { error } = useTimelineProvider();
  const isMobile = useIsMobile();

  if (error) return <main>Error loading timeline.</main>;
  if (isMobile) return <MobileHomePage />;

  return (
    <main className="relative flex grow flex-col px-2 md:px-10">
      <TimelineHero />
      <TimelineGrid />
      <TimelineSpiral />
    </main>
  );
};

export default TimelinePage;
