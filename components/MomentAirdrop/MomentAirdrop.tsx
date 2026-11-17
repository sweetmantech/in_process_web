"use client";

import AirdropCard from "./AirdropCard";

interface MomentAirdropProps {
  canAirdrop?: boolean;
}

const MomentAirdrop = ({ canAirdrop }: MomentAirdropProps) => (
  <AirdropCard canAirdrop={canAirdrop} />
);

export default MomentAirdrop;
