"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CollectModalContents from "@/components/MomentPage/CollectModalContents";
import { getMomentKey } from "@/lib/moment/getMomentKey";
import { getMomentSeed } from "@/lib/moment/getMomentSeed";
import { MomentCollectProvider } from "@/providers/MomentCollectProvider";
import { MomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { MomentProvider } from "@/providers/MomentProvider";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const CommentDrawer = () => {
  const { isDrawerOpen, commentMoment, closeDrawer } = useMobileDrawersProvider();
  const isOpen = isDrawerOpen("comment");

  if (!commentMoment) return null;

  const moment = getMomentKey(commentMoment);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <DialogContent className="flex max-w-xl flex-col items-center !gap-0 overflow-hidden !rounded-lg border-none !bg-white bg-transparent px-8 py-10 shadow-lg">
        <VisuallyHidden>
          <DialogTitle>Collect</DialogTitle>
        </VisuallyHidden>
        <MomentProvider
          key={commentMoment.id}
          moment={moment}
          initialData={getMomentSeed(commentMoment)}
        >
          <MomentCommentsProvider>
            <MomentCollectProvider>
              <CollectModalContents />
            </MomentCollectProvider>
          </MomentCommentsProvider>
        </MomentProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDrawer;
