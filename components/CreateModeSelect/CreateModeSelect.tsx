"use client";

import DesktopSelect from "./DesktopSelect";
import useIsMobile from "@/hooks/useIsMobile";
import MobileSelect from "./MobileSelect";

const CreateModeSelect = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className="col-span-1">{<MobileSelect />}</div>;
  }

  return <DesktopSelect />;
};

export default CreateModeSelect;
