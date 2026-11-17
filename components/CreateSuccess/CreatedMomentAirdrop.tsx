"use client";

import MomentAirdrop from "../MomentAirdrop";
import { useMomentProvider } from "@/providers/MomentProvider";
import { Fragment } from "react";

interface CreatedMomentAirdropProps {
  canAirdrop: boolean;
}

const CreatedMomentAirdrop = ({ canAirdrop }: CreatedMomentAirdropProps) => {
  const { moment } = useMomentProvider();

  if (!moment.collectionAddress) return <Fragment />;

  return <MomentAirdrop canAirdrop={canAirdrop} />;
};

export default CreatedMomentAirdrop;
