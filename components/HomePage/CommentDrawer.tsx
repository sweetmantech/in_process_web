"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Comments from "@/components/MomentPage/Comments";
import useIsMobile from "@/hooks/useIsMobile";
import { getMomentKey } from "@/lib/moment/getMomentKey";
import { getMomentSeed } from "@/lib/moment/getMomentSeed";
import { MomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { MomentProvider } from "@/providers/MomentProvider";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import { cn } from "@/lib/utils";

const headerClass =
  "flex shrink-0 items-center justify-between gap-3 border-b border-[#DDD8CC] px-[18px] pb-3 pt-4";
const titleClass =
  "font-archivo-bold text-xs uppercase tracking-[0.06em] text-grey-moss-900";

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

  const closeButton = (
    <button
      type="button"
      onClick={closeDrawer}
      aria-label="Close comments"
      className="flex shrink-0 items-center text-grey-moss-400 active:opacity-70"
    >
      <X className="size-5" strokeWidth={1.5} />
    </button>
  );

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
          <div className={headerClass}>
            <DialogTitle className={cn(titleClass, "text-left")}>{title}</DialogTitle>
            {closeButton}
          </div>
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
      <div className={headerClass}>
        <h2 className={titleClass}>{title}</h2>
        {closeButton}
      </div>
      {body}
    </div>,
    document.body
  );
};

export default CommentDrawer;
