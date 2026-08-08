import { Skeleton } from "@/components/ui/skeleton";

export type ProfileStat = {
  value: string;
  label: string;
  mobileLabel?: string;
  loading: boolean;
};

type Props = {
  stats: ProfileStat[];
};

const ProfileStats = ({ stats }: Props) => {
  return (
    <>
      <div className="flex w-full overflow-hidden rounded-xl border border-[rgba(28,26,23,0.12)] bg-white md:hidden">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex-1 px-2.5 py-[13px] text-center ${
              index < stats.length - 1 ? "border-r border-[rgba(28,26,23,0.08)]" : ""
            }`}
          >
            <div className="whitespace-nowrap font-spectral-medium text-[19px] leading-none text-[#1c1a17]">
              {stat.loading ? <Skeleton className="mx-auto h-5 w-12" /> : stat.value}
            </div>
            <div className="mt-1.5 whitespace-nowrap font-mono text-[8.5px] uppercase tracking-[0.12em] text-[#8a8578]">
              {stat.mobileLabel ?? stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="hidden shrink-0 md:flex">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`px-[22px] py-1.5 text-right ${index === 0 ? "" : "border-l border-[rgba(28,26,23,0.12)]"}`}
          >
            <div className="whitespace-nowrap font-spectral-medium text-[25px] leading-none text-[#1c1a17]">
              {stat.loading ? <Skeleton className="ml-auto h-6 w-16" /> : stat.value}
            </div>
            <div className="mt-[7px] font-mono text-[9.5px] uppercase tracking-[0.13em] text-[#8a8578]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileStats;
