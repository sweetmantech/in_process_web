import { AirdropItem } from "@/types/airdrop";
import { Transfer } from "@/types/moment";

const buildOptimisticAirdropTransfers = ({
  items,
  transactionHash,
}: {
  items: AirdropItem[];
  transactionHash: string;
}): Transfer[] => {
  const timestamp = Date.now();

  return items.map((item, index) => {
    if (item.email) {
      return {
        id: `optimistic-${transactionHash}-${index}`,
        collector: item.email,
        username: item.email,
        amount: 1,
        transactionHash,
        timestamp,
      };
    }

    return {
      id: `optimistic-${transactionHash}-${index}`,
      collector: item.address,
      username: item.ensName || "",
      amount: 1,
      transactionHash,
      timestamp,
    };
  });
};

export default buildOptimisticAirdropTransfers;
