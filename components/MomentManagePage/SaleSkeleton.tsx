import { Skeleton } from "../ui/skeleton";

const FIELD_LABEL_CLASS = "font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300";

const SaleSkeleton = () => (
  <div className="rounded-lg border border-grey-moss-100 bg-white p-4 shadow-sm md:p-6">
    <div className="mb-4 flex items-center gap-1.5">
      <span className="size-1.5 rounded-full bg-[#03c7f6]" />
      <span className={FIELD_LABEL_CLASS}>sale</span>
    </div>
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  </div>
);

export default SaleSkeleton;
