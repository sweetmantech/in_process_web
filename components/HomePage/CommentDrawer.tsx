"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Comments from "@/components/MomentPage/Comments";
import useIsMobile from "@/hooks/useIsMobile";
import { getMomentKey } from "@/lib/moment/getMomentKey";
import { getMomentSeed } from "@/lib/moment/getMomentSeed";
import { MomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { MomentProvider } from "@/providers/MomentProvider";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import { cn } from "@/lib/utils";

const CommentDrawer = () => {
  const { isDrawerOpen, commentMoment, closeDrawer } = useMobileDrawersProvider();
  const isOpen = isDrawerOpen("comment");
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!commentMoment) return null;

  const moment = getMomentKey(commentMoment);
  const commentCount = commentMoment.comments ?? 0;
  const title = commentCount > 0 ? `comments (${commentCount.toLocaleString()})` : "comments";

  const body = (
    <MomentProvider
      key={commentMoment.id}
      moment={moment}
      initialData={getMomentSeed(commentMoment)}
    >
      <MomentCommentsProvider>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <Comments />
        </div>
      </MomentCommentsProvider>
    </MomentProvider>
  );

  if (!isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
        <DialogContent className="flex h-[min(85vh,640px)] w-[calc(100%-2rem)] max-w-md flex-col !gap-0 overflow-hidden !rounded-lg border-none !bg-white p-0 shadow-lg">
          <DialogTitle className="shrink-0 border-b border-[#DDD8CC] px-[18px] pb-3 pt-4 text-left font-archivo-bold text-xs uppercase tracking-[0.06em] text-grey-moss-900">
            {title}
          </DialogTitle>
          {body}
        </DialogContent>
      </Dialog>
    );
  }

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={cn(
        "fixed bottom-[calc(74px+env(safe-area-inset-bottom,0px))] left-0 right-0 top-0 z-50 flex flex-col overflow-hidden bg-white transition-transform duration-300 ease-out will-change-transform",
        isOpen ? "translate-y-0" : "pointer-events-none translate-y-[2000px]"
      )}
    >
      <h2 className="shrink-0 border-b border-[#DDD8CC] px-[18px] pb-3 pt-4 font-archivo-bold text-xs uppercase tracking-[0.06em] text-grey-moss-900">
        {title}
      </h2>
      {body}
    </div>,
    document.body
  );
};

export default CommentDrawer;
