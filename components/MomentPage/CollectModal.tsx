"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CollectModalContents from "@/components/MomentPage/CollectModalContents";
import { Fragment, MouseEvent } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useUserProvider } from "@/providers/UserProvider";
import useCollectAvailability from "@/hooks/useCollectAvailability";

const CollectModal = () => {
  const { isOpenCommentModal, setIsOpenCommentModal } = useMomentCommentsProvider();
  const { isLoading, metadata } = useMomentProvider();
  const { isCollectDisabled, collectCtaLabel } = useCollectAvailability();
  const { isPrepared } = useUserProvider();

  const handleCollect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isPrepared()) return;
    setIsOpenCommentModal(true);
  };

  if (isLoading || !metadata) return <Fragment />;

  return (
    <Dialog
      open={isOpenCommentModal}
      onOpenChange={() => setIsOpenCommentModal(!isOpenCommentModal)}
    >
      <DialogTrigger
        asChild
        onClick={handleCollect}
        disabled={isCollectDisabled}
        className="disabled:cursor-not-allowed disabled:bg-grey-moss-300"
      >
        <button
          type="button"
          className="h-fit w-full rounded-md bg-black py-2 font-archivo text-2xl text-grey-eggshell hover:bg-grey-moss-300 md:h-[60px] md:w-[420px]"
        >
          {collectCtaLabel}
        </button>
      </DialogTrigger>
      <DialogContent className="flex max-w-xl flex-col items-center !gap-0 overflow-hidden !rounded-3xl border-none !bg-white bg-transparent px-8 py-10 shadow-lg">
        <VisuallyHidden>
          <DialogTitle>Collect</DialogTitle>
        </VisuallyHidden>
        <CollectModalContents />
      </DialogContent>
    </Dialog>
  );
};

export default CollectModal;
