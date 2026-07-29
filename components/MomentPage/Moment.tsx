"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import MomentLayout from "./MomentLayout";

const Moment = () => {
  const { metadata } = useMomentProvider();

  if (!metadata) return null;

  return <MomentLayout />;
};

export default Moment;
