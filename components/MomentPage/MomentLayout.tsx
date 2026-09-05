"use client";

import BackToTimeline from "./BackToTimeline";
import MomentMeta from "./MomentMeta";
import MomentMediaFrame from "./MomentMediaFrame";
import MomentActionCard from "./MomentActionCard";
import MomentActivityCard from "./MomentActivityCard";
import MomentCollectBar from "./MomentCollectBar";
import MomentAirdropAccordion from "./MomentAirdropAccordion";
import MomentCollectDialog from "./MomentCollectDialog";

/** Same viewport band as the right rail — keeps a 2rem floor gap. */
const DESKTOP_VIEWPORT_BAND =
  "md:sticky md:top-[calc(64px+2rem)] md:h-[calc(100dvh-64px-4rem)] md:max-h-[calc(100dvh-64px-4rem)]";

const MomentLayout = () => {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-[18px] pb-[88px] pt-2 md:px-10 md:pb-8">
      <div className="md:hidden">
        <BackToTimeline />
      </div>

      <div className="flex flex-col gap-4 md:grid md:grid-cols-[minmax(0,1fr)_340px] md:items-start md:gap-10">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="hidden md:block">
            <BackToTimeline />
          </div>
          <div className="flex flex-col md:gap-4">
            <div className="order-2 md:order-1">
              <MomentMeta />
            </div>
            <div
              className={`order-1 md:order-2 md:min-h-0 md:overflow-hidden ${DESKTOP_VIEWPORT_BAND}`}
            >
              <MomentMediaFrame />
            </div>
          </div>
          <MomentAirdropAccordion />
          <div className="order-3 mt-[18px] md:hidden">
            <MomentActivityCard />
          </div>
        </div>

        <div
          className={`hidden w-full shrink-0 flex-col gap-4 md:grid md:w-[340px] md:min-h-0 md:grid-rows-[auto,minmax(0,1fr)] md:overflow-hidden ${DESKTOP_VIEWPORT_BAND}`}
        >
          <MomentActionCard />
          <MomentActivityCard />
        </div>
      </div>

      <MomentCollectBar />
      <MomentCollectDialog />
    </div>
  );
};

export default MomentLayout;
