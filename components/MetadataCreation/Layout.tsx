"use client";

import CreateForm from "../CreateForm";
import CreateModeSelect from "../CreateModeSelect";
import Preview from "./Preview";
import StageFooter from "./StageFooter";
import MobileCreateBar from "./MobileCreateBar";
import BulkCenterGrid from "@/components/BulkUpload/BulkCenterGrid";
import BulkSideForm from "@/components/BulkUpload/BulkSideForm";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isBulkMode } = useBulkCreateProvider();

  return (
    <>
      <section className="col-span-1 flex min-h-0 w-full flex-col md:flex-1 md:overflow-hidden md:px-11 md:pb-8 md:pt-7">
        <CreateModeSelect />
        {isBulkMode ? <BulkCenterGrid /> : <Preview>{children}</Preview>}
        <StageFooter />
      </section>
      <aside className="col-span-1 w-full pb-[120px] md:flex md:h-full md:w-[400px] md:shrink-0 md:flex-col md:overflow-y-auto md:border-l md:border-[#E0DDD8] md:bg-white md:px-[34px] md:pb-10 md:pt-[34px]">
        {isBulkMode ? <BulkSideForm /> : <CreateForm />}
      </aside>
      <MobileCreateBar />
    </>
  );
};

export default Layout;
