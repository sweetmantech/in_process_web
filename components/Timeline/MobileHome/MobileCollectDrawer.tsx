"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import MobileCollectDrawerPanel from "@/components/Timeline/MobileHome/MobileCollectDrawerPanel";
import { getMomentKey } from "@/lib/moment/getMomentKey";
import { getMomentSeed } from "@/lib/moment/getMomentSeed";
import { MomentCollectProvider } from "@/providers/MomentCollectProvider";
import { MomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { MomentProvider } from "@/providers/MomentProvider";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const MobileCollectDrawer = () => {
  const { isDrawerOpen, collectMoment, closeDrawer } = useMobileDrawersProvider();
  const isOpen = isDrawerOpen("collect");

  if (!collectMoment) return null;

  const moment = getMomentKey(collectMoment);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <DialogContent className="flex max-h-[85vh] w-[calc(100%-2rem)] max-w-sm flex-col items-center !gap-0 overflow-y-auto !rounded-lg border-none !bg-white px-5 py-5 shadow-lg">
        <VisuallyHidden>
          <DialogTitle>Collect</DialogTitle>
        </VisuallyHidden>
        <MomentProvider
          key={collectMoment.id}
          moment={moment}
          initialData={getMomentSeed(collectMoment)}
        >
          <MomentCommentsProvider>
            <MomentCollectProvider>
              <MobileCollectDrawerPanel onClose={closeDrawer} />
            </MomentCollectProvider>
          </MomentCommentsProvider>
        </MomentProvider>
      </DialogContent>
    </Dialog>
  );
};

export default MobileCollectDrawer;
