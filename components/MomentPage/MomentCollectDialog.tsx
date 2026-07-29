"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import CollectModalContents from "@/components/MomentPage/CollectModalContents";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";

const MomentCollectDialog = () => {
  const { isOpenCommentModal, setIsOpenCommentModal } = useMomentCommentsProvider();

  return (
    <Dialog open={isOpenCommentModal} onOpenChange={setIsOpenCommentModal}>
      <DialogContent className="flex max-w-xl flex-col items-center !gap-0 overflow-hidden !rounded-3xl border-none !bg-white bg-transparent px-8 py-10 shadow-lg">
        <VisuallyHidden>
          <DialogTitle>Collect</DialogTitle>
        </VisuallyHidden>
        <CollectModalContents />
      </DialogContent>
    </Dialog>
  );
};

export default MomentCollectDialog;
