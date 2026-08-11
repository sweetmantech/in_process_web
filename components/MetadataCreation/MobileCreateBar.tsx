"use client";

import CreateButton from "@/components/CreateForm/CreateButton";
import BulkCreateButton from "@/components/BulkUpload/BulkCreateButton";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";

/**
 * Anchored to the 74px footer. Bottom padding clears the overhanging +
 * (`h-20` / `-translate-y-[26%]` ≈ 21px) with a tight gap under the CTA.
 */
const MobileCreateBar = () => {
  const { isBulkMode } = useBulkCreateProvider();

  return (
    <div className="fixed bottom-[calc(74px+env(safe-area-inset-bottom,0px))] left-0 right-0 z-[55] border-t border-[#EDEAE2] bg-[#F7F5F0] px-3 pb-[22px] pt-3 md:hidden">
      {isBulkMode ? <BulkCreateButton /> : <CreateButton />}
    </div>
  );
};

export default MobileCreateBar;
