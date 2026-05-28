import { IN_PROCESS_API } from "@/lib/consts";

const disconnectWallet = async (authHeaders: HeadersInit) => {
  const response = await fetch(`${IN_PROCESS_API}/artists/wallets`, {
    method: "DELETE",
    headers: authHeaders,
  });
  const data = await response.json();
  return data;
};

export default disconnectWallet;
