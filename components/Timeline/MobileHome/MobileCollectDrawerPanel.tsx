"use client";

import CollectModalContents from "@/components/MomentPage/CollectModalContents";
import { useMomentCollectProvider } from "@/providers/MomentCollectProvider";
import { X } from "lucide-react";
import { useEffect } from "react";

interface MobileCollectDrawerPanelProps {
  onClose: () => void;
}

const MobileCollectDrawerPanel = ({ onClose }: MobileCollectDrawerPanelProps) => {
  const { collected } = useMomentCollectProvider();

  useEffect(() => {
    if (collected) onClose();
  }, [collected, onClose]);

  return (
    <div className="relative flex flex-col px-6 pb-4 pt-10">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-4 flex h-8 w-8 items-center justify-center text-grey-moss-400"
      >
        <X className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <CollectModalContents />
    </div>
  );
};

export default MobileCollectDrawerPanel;
