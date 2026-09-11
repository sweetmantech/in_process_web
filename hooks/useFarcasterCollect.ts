import { Address, erc20Abi, parseUnits } from "viem";
import {
  useSendTransaction,
  useWriteContract,
  usePublicClient,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { toast } from "sonner";
import { CHAIN_ID, USDC_ADDRESS } from "@/lib/consts";
import { Moment, MomentSaleConfig, MomentType } from "@/types/moment";
import getCollectCall from "@/lib/viem/getCollectCall";
import getUsdcAllowance from "@/lib/viem/getUsdcAllowance";
import { erc20MinterAddresses } from "@/lib/protocolSdk/constants";
import checkFarcasterCollectBalance from "@/lib/moment/checkFarcasterCollectBalance";

type CollectWithFarcasterWalletParams = {
  account: Address;
  moment: Moment;
  saleConfig: MomentSaleConfig;
  amount: number;
  comment: string;
};

const useFarcasterCollect = () => {
  const { mutateAsync: sendTransactionAsync } = useSendTransaction();
  const { mutateAsync: writeContractAsync } = useWriteContract();
  const { mutateAsync: switchChainAsync } = useSwitchChain();
  const publicClient = usePublicClient({ chainId: CHAIN_ID });
  const chainId = useChainId();

  const ensureChain = async () => {
    if (chainId === CHAIN_ID) return;
    toast.info("Switching to the correct network...");
    await switchChainAsync({ chainId: CHAIN_ID });
  };

  const waitForSuccess = async (hash: `0x${string}`) => {
    if (!publicClient) throw new Error("No public client available to confirm transaction");
    toast.info("Waiting for confirmation...");
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    if (receipt.status !== "success") throw new Error("Transaction failed");
  };

  const collectWithFarcasterWallet = async ({
    account,
    moment,
    saleConfig,
    amount,
    comment,
  }: CollectWithFarcasterWalletParams): Promise<void> => {
    if (!publicClient) throw new Error("No public client available to confirm transaction");

    const { sufficient, currency, totalPriceBase } = await checkFarcasterCollectBalance(
      account,
      saleConfig,
      amount
    );
    if (!sufficient) {
      toast.error(`Insufficient ${currency.toUpperCase()} balance to collect.`);
      throw new Error(`Insufficient ${currency} balance.`);
    }

    await ensureChain();

    if (saleConfig.type === MomentType.Erc20Mint) {
      const minter = erc20MinterAddresses[CHAIN_ID];
      const allowance = await getUsdcAllowance(account, minter);
      if (parseUnits(allowance, 6) < totalPriceBase) {
        toast.info("Requesting USDC approval...");
        const approveHash = await writeContractAsync({
          address: USDC_ADDRESS[CHAIN_ID],
          abi: erc20Abi,
          functionName: "approve",
          args: [minter, totalPriceBase],
          chainId: CHAIN_ID,
        });
        await waitForSuccess(approveHash);
      }
    }

    const call = getCollectCall(
      moment.collectionAddress,
      Number(moment.tokenId),
      saleConfig,
      account,
      comment,
      amount
    );

    toast.info("Requesting collect signature...");
    const hash = await sendTransactionAsync({
      to: call.to,
      data: call.data,
      value: call.value,
      chainId: CHAIN_ID,
    });
    await waitForSuccess(hash);
  };

  return { collectWithFarcasterWallet };
};

export default useFarcasterCollect;
