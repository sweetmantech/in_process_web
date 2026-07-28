"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import { useMomentCollectProvider } from "@/providers/MomentCollectProvider";
import MomentLayout from "./MomentLayout";
import MomentCollectedActions from "./MomentCollectedActions";

const Moment = () => {
  const { metadata } = useMomentProvider();
  const { collected } = useMomentCollectProvider();

  if (!metadata) return null;

  return <MomentLayout actionSlot={collected ? <MomentCollectedActions /> : undefined} />;
};

export default Moment;
