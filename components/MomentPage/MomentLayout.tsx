"use client";

import BackToTimeline from "./BackToTimeline";
import MomentMeta from "./MomentMeta";
import MomentMediaFrame from "./MomentMediaFrame";
import MomentActionCard from "./MomentActionCard";
import MomentActivityCard from "./MomentActivityCard";

const MomentLayout = () => {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-3 pb-20 pt-2 md:px-10">
      <BackToTimeline />
      <div className="flex flex-col gap-10 md:flex-row md:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <MomentMeta />
          <MomentMediaFrame />
        </div>
        <div className="flex w-full shrink-0 flex-col gap-4 md:sticky md:top-24 md:w-[340px]">
          <MomentActionCard />
          <MomentActivityCard />
        </div>
      </div>
    </div>
  );
};

export default MomentLayout;
