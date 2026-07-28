"use client";

import useConnectedWallet from "@/hooks/useConnectedWallet";
import useDownload from "@/hooks/useDownload";
import useShareMoment from "@/hooks/useShareMoment";
import { useMomentCollectProvider } from "@/providers/MomentCollectProvider";
import { useRouter } from "next/navigation";
import { Share2, Download } from "lucide-react";

const MomentCollectedActions = () => {
  const { setCollected } = useMomentCollectProvider();
  const { push } = useRouter();
  const { privyWallet } = useConnectedWallet();
  const { share } = useShareMoment();
  const { download, isDownloading } = useDownload();

  const visit = () => {
    setCollected(true);
    push(`/${privyWallet?.address}`);
  };

  return (
    <div className="rounded-[10px] border border-[#E4E0D7] bg-white p-5 shadow-[0_4px_16px_-6px_rgba(27,21,4,.14)]">
      <p className="font-archivo-medium text-lg text-grey-moss-900">moment collected</p>
      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-[12px] bg-grey-moss-900 py-[15px] font-archivo-medium text-base text-white transition-colors hover:bg-black"
        onClick={share}
      >
        <Share2 className="size-[18px]" strokeWidth={1.75} />
        share
      </button>
      <button
        type="button"
        className="mt-2.5 flex w-full items-center justify-center rounded-[20px] border border-[#E4E0D7] bg-white/80 py-2.5 font-archivo-medium text-xs text-[#6B6456] transition-colors hover:border-grey-moss-900 hover:text-grey-moss-900"
        onClick={visit}
      >
        visit timeline
      </button>
      <button
        type="button"
        className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-[20px] border border-[#E4E0D7] bg-white/80 py-2.5 font-archivo-medium text-xs text-[#6B6456] transition-colors hover:border-grey-moss-900 hover:text-grey-moss-900 disabled:opacity-50"
        onClick={download}
        disabled={isDownloading}
      >
        <Download className="size-[13px]" strokeWidth={1.75} />
        download
      </button>
    </div>
  );
};

export default MomentCollectedActions;
