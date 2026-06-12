"use client";

import CreateForm from "../CreateForm";
import CreateModeSelect from "../CreateModeSelect";
import MaskLines from "../CreateModeSelect/MaskLines";
import Preview from "./Preview";
import BulkCenterGrid from "@/components/BulkUpload/BulkCenterGrid";
import BulkSideForm from "@/components/BulkUpload/BulkSideForm";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isBulkMode } = useBulkCreateProvider();

  return (
    <>
      <MaskLines />
      <CreateModeSelect />
      {isBulkMode ? <BulkCenterGrid /> : <Preview>{children}</Preview>}
      {isBulkMode ? <BulkSideForm /> : <CreateForm />}
    </>
  );
};

export default Layout;
