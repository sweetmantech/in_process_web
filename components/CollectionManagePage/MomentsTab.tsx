"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { TimelineProvider } from "@/providers/TimelineProvider";
import Moments from "@/components/MomentsGrid/Moments";

const FIELD_LABEL_CLASS = "font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300";

interface MomentsTabProps {
  collection: string;
}

const MomentsTab = ({ collection }: MomentsTabProps) => {
  const { push } = useRouter();

  return (
    <div className="rounded-lg border border-grey-moss-100 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#7FD58A]" />
          <span className={FIELD_LABEL_CLASS}>moments</span>
        </div>
        <button
          type="button"
          onClick={() => push("/create")}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-grey-moss-900 bg-grey-moss-900 px-3.5 py-1.5 font-archivo-medium text-[11.5px] text-white transition-colors hover:bg-black"
        >
          <Plus className="size-3.5" strokeWidth={2} />
          Add moment
        </button>
      </div>
      <TimelineProvider collection={collection} includeHidden={true}>
        <Moments />
      </TimelineProvider>
    </div>
  );
};

export default MomentsTab;
