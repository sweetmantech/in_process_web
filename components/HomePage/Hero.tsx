"use client";

import { useHomePage } from "@/hooks/useHomePage";
import MomentCount from "@/components/HomePage/MomentCount";
import CreateButton from "@/components/HomePage/CreateButton";

const Hero = () => {
  const { totalCount, todayCount, onCreateClick } = useHomePage();

  return (
    <div className="pb-2 pt-8 grid md:grid-cols-2 px-2">
      <div className="col-span-2 font-spectral-italic text-3xl leading-tight tracking-[-1px] text-grey-moss-900 md:text-4xl lg:text-[38px] pb-2">
        a collective timeline <br className="md:hidden" /> for artists
      </div>
      <div className="col-span-1">
        <MomentCount totalCount={totalCount} todayCount={todayCount} />
      </div>
      <div className="col-span-1 flex justify-end">
        <CreateButton onClick={onCreateClick} />
      </div>
    </div>
  );
};

export default Hero;
