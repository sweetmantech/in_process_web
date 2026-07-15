import { Skeleton } from "@/components/ui/skeleton";
import CardSectionHeaderSkeleton from "./CardSectionHeaderSkeleton";

const ProfileInfoCardSkeleton = () => (
  <div className="rounded-md border border-grey-moss-100 bg-white p-4 shadow-[0_4px_16px_-6px_rgba(27,21,4,0.14)] md:rounded-lg md:px-6 md:py-[22px]">
    <CardSectionHeaderSkeleton labelWidth="w-16" marginBottom="mb-3.5 md:mb-[18px]" />
    <div className="flex flex-col gap-3 md:gap-3.5">
      <div className="flex flex-col gap-[5px]">
        <Skeleton className="h-2.5 w-24" />
        <Skeleton className="h-[41px] w-full rounded-md" />
      </div>
      <div className="flex flex-col gap-[5px]">
        <Skeleton className="h-2.5 w-8" />
        <Skeleton className="h-[76px] w-full rounded-md" />
      </div>
    </div>

    <div className="-mx-4 my-4 h-px bg-grey-moss-50 md:-mx-6 md:my-[22px]" />

    <CardSectionHeaderSkeleton labelWidth="w-28" marginBottom="mb-3.5 md:mb-[18px]" />
    <div className="flex flex-col gap-3 md:gap-3.5">
      {["w-16", "w-6", "w-16"].map((labelWidth, i) => (
        <div key={i} className="flex flex-col gap-[5px]">
          <Skeleton className={`h-2.5 ${labelWidth}`} />
          <Skeleton className="h-[41px] w-full rounded-md" />
        </div>
      ))}
    </div>
  </div>
);

export default ProfileInfoCardSkeleton;
