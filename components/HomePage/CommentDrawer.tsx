"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CommentComposer from "@/components/MomentPage/CommentComposer";
import { getMomentKey } from "@/lib/moment/getMomentKey";
import { getMomentSeed } from "@/lib/moment/getMomentSeed";
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
      <DialogContent className="flex w-[calc(100%-2rem)] max-w-sm flex-col !gap-0 overflow-hidden !rounded-lg border-none !bg-white px-5 py-5 shadow-lg">
        <VisuallyHidden>
          <DialogTitle>Comment</DialogTitle>
        </VisuallyHidden>
        <MomentProvider
          key={commentMoment.id}
          moment={moment}
          initialData={getMomentSeed(commentMoment)}
        >
          <MomentCommentsProvider>
            <CommentComposer
              placeholder="add a comment…"
              submitLabel="add comment"
              autoFocus
              onSuccess={closeDrawer}
            />
          </MomentCommentsProvider>
        </MomentProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDrawer;
