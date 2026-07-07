"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import Notes from "./Notes";
import { Skeleton } from "../ui/skeleton";
import useMediaInitialization from "@/hooks/useMediaInitialization";
import { MomentEditProvider } from "@/providers/MomentEditProvider";
import MomentDetailsCard from "./MomentDetailsCard";
import AirdropCard from "./AirdropCard";

const SMSMoment = () => {
  const { metadata, isLoading } = useMomentProvider();

  useMediaInitialization(metadata ?? undefined);

  if (!metadata || isLoading)
    return (
      <div className="flex flex-col gap-3 px-3 pb-8 pt-3 md:px-10">
        <div className="flex flex-col gap-3 rounded-md border border-grey-moss-100 bg-white p-4">
          <Skeleton className="h-4 w-2/3" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-14 w-14 shrink-0 rounded-lg" />
            <Skeleton className="h-9 flex-1" />
          </div>
          <Skeleton className="h-16 w-full" />
        </div>
        <div className="flex flex-col gap-3 rounded-md border border-grey-moss-100 bg-white p-4">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );

  return (
    <MomentEditProvider>
      <div className="flex flex-col gap-3 px-3 pb-8 pt-3 md:px-10">
        <MomentDetailsCard />
        <AirdropCard />
        <Notes />
      </div>
    </MomentEditProvider>
  );
};

export default SMSMoment;
