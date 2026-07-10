"use client";

import { useMomentCollectProvider } from "@/providers/MomentCollectProvider";
import { X } from "lucide-react";
import { useEffect } from "react";
import CollectModalContents from "@/components/HomePage/CollectModalContents";

interface CollectDrawerPanelProps {
  onClose: () => void;
}

const CollectDrawerPanel = ({ onClose }: CollectDrawerPanelProps) => {
  const { collected } = useMomentCollectProvider();

  useEffect(() => {
    if (collected) onClose();
  }, [collected, onClose]);

  return (
    <div className="relative flex w-full flex-col items-center pt-5">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-0 top-[-12px] flex h-8 w-8 items-center justify-center text-grey-moss-400"
      >
        <X className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <CollectModalContents />
    </div>
  );
};

export default CollectDrawerPanel;
