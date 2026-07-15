import { ReactNode } from "react";
import CardSectionHeader from "./CardSectionHeader";

const ConnectionsCard = ({ children }: { children: ReactNode }) => (
  <div className="rounded-md border border-grey-moss-100 bg-white p-4 shadow-[0_4px_16px_-6px_rgba(27,21,4,0.14)] md:rounded-lg md:px-6 md:py-[22px]">
    <CardSectionHeader dotColor="#7FD58A" label="connections" marginBottom="mb-1.5 md:mb-2" />
    <div className="flex flex-col">{children}</div>
  </div>
);

export default ConnectionsCard;
