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
      <div className="flex flex-col gap-2 w-full px-3">
        <Skeleton className="w-1/3 h-[40px]" />
        <Skeleton className="w-1/2 h-[40px]" />
        <Skeleton className="w-3/4 h-[40px]" />
        <Skeleton className="w-full h-[40px]" />
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
