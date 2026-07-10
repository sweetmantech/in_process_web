"use client";

import { useHomePage } from "@/hooks/useHomePage";
import MomentCount from "@/components/HomePage/MomentCount";
import CreateButton from "@/components/HomePage/CreateButton";

const Hero = () => {
  const { totalCount, todayCount, onCreateClick } = useHomePage();

  return (
    <div className="flex items-end justify-between gap-8 pb-6 pt-8 lg:gap-12">
      <div className="max-w-2xl flex-1 text-left">
        <h1 className="font-spectral-italic text-3xl leading-tight tracking-[-1px] text-grey-moss-900 md:text-4xl lg:text-[38px]">
          a collective timeline
          <br className="md:hidden" /> for artists
        </h1>
        <div className="mt-3">
          <MomentCount totalCount={totalCount} todayCount={todayCount} />
        </div>
      </div>

      <div className="flex flex-shrink-0 items-end">
        <CreateButton onClick={onCreateClick} />
      </div>
    </div>
  );
};

export default Hero;
