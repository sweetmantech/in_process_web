import {
  Address,
  concat,
  createWalletClient,
  custom,
  encodeFunctionData,
  erc20Abi,
  parseUnits,
  stringToHex,
} from "viem";
import { base } from "viem/chains";
import { ConnectedWallet } from "@privy-io/react-auth";
import { ARWEAVE_WALLET_ADDRESS, USDC_ADDRESS } from "@/lib/consts";
import { getPublicClient } from "@/lib/viem/publicClient";
import getTurboUsdcDepositAddress from "./getTurboUsdcDepositAddress";
import submitTurboFundTx from "./submitTurboFundTx";

interface TopUpArweaveWithUsdcParams {
  wallet: Pick<ConnectedWallet, "address" | "switchChain" | "getEthereumProvider">;
  amount: string;
}

const topUpArweaveWithUsdc = async ({ wallet, amount }: TopUpArweaveWithUsdcParams) => {
  const account = wallet.address as Address;
  const usdcAmount = parseUnits(amount, 6);
  const publicClient = getPublicClient(base.id);

  const usdcBalance = await publicClient.readContract({
    address: USDC_ADDRESS[base.id],
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account],
  });
  if (usdcBalance < usdcAmount) throw new Error("Insufficient USDC balance on Base");

  const depositAddress = await getTurboUsdcDepositAddress();

  await wallet.switchChain(base.id);
  const client = createWalletClient({
    account,
    chain: base,
    transport: custom(await wallet.getEthereumProvider()),
  });

  const data = concat([
    encodeFunctionData({
      abi: erc20Abi,
      functionName: "transfer",
      args: [depositAddress, usdcAmount],
    }),
    stringToHex(`turboCreditDestinationAddress=${ARWEAVE_WALLET_ADDRESS}`),
  ]);

  const hash = await client.sendTransaction({ to: USDC_ADDRESS[base.id], data });
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  if (receipt.status !== "success") throw new Error("USDC transfer failed");

  await submitTurboFundTx(hash);
  return hash;
};

export default topUpArweaveWithUsdc;
