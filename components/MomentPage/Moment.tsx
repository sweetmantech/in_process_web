"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import MomentLayout from "./MomentLayout";
import MomentPageSkeleton from "./MomentPageSkeleton";

const Moment = () => {
  const { metadata, isLoading } = useMomentProvider();

  if (isLoading || !metadata) {
    return <MomentPageSkeleton />;
  }

  return <MomentLayout />;
};

export default Moment;
