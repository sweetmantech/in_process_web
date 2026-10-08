import { TURBO_PAYMENT_URL } from "@/lib/consts";

const submitTurboFundTx = async (txId: string) => {
  const res = await fetch(`${TURBO_PAYMENT_URL}/account/balance/base-usdc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tx_id: txId }),
  });
  if (!res.ok) throw new Error(`Failed to submit top up transaction ${txId} to Turbo`);
  return res.json();
};

export default submitTurboFundTx;
